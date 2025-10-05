import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import { MessageModel } from '../message/message.model';
import { formatTimeAgo } from '../../../helpers/timeFormat';
import { MESSAGE_STATUS } from '../message/message.interface';
const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
  //set role
  payload.role = USER_ROLES.USER;
  console.log(payload);
  const createUser = await User.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  //send email
  const otp = generateOTP();
  const values = {
    name: createUser.name,
    otp: otp,
    email: createUser.email!,
  };
  const createAccountTemplate = emailTemplate.createAccount(values);
  emailHelper.sendEmail(createAccountTemplate);

  //save to DB
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 3 * 60000),
  };
  await User.findOneAndUpdate(
    { _id: createUser._id },
    { $set: { authentication } }
  );

  return createUser;
};

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const getUserAllProfileFromDB = async (
  loggedInUserId: string
): Promise<Partial<IUser>[]> => {
  const users = await User.find({
    _id: { $ne: loggedInUserId },
    role: { $ne: 'SUPER_ADMIN' },
  }).lean();

  if (!users || users.length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'No users found!');
  }

  // Fetch all messages where logged-in user is sender or receiver
  const messages = await MessageModel.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  })
    .sort({ createdAt: -1 })
    .lean();

  // Map users to contacts with lastMessage, timestamp, unreadCount
  const contacts = users.map(user => {
    const userMessages = messages.filter(
      msg =>
        (msg.senderId.toString() === user._id.toString() &&
          msg.receiverId?.toString() === loggedInUserId) ||
        (msg.receiverId?.toString() === user._id.toString() &&
          msg.senderId.toString() === loggedInUserId)
    );

    const lastMessage = userMessages[0]?.content || '';
    const timestamp = userMessages[0]
      ? formatTimeAgo(new Date(userMessages[0].createdAt))
      : formatTimeAgo(new Date(user.lastSeen));
    const unreadCount = userMessages.filter(
      msg =>
        msg.senderId.toString() === user._id.toString() &&
        msg.status !== MESSAGE_STATUS.READ
    ).length;

    return {
      id: user._id.toString(),
      name: user.name,
      image: user.image || '',
      isOnline: user.onlineStatus === 'online',
      lastMessage,
      timestamp,
      unreadCount,
    };
  });

  return contacts;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

interface SearchUsersParams {
  query: string;
  currentUserId: string;
}

// search user for sending chat request.
const searchUsersService = async ({
  query,
  currentUserId,
}: SearchUsersParams) => {
  if (!query) return [];

  const users = await User.find({
    _id: { $ne: currentUserId },
    role: { $ne: 'SUPER_ADMIN' },
    $or: [{ name: { $regex: query, $options: 'i' } }],
  })
    .select('name image onlineStatus')
    .limit(10);

  return users;
};

export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  searchUsersService,
  getUserAllProfileFromDB,
};
