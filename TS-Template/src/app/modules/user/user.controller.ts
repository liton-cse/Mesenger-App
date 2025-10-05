import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
// create user profile ...
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);
// get the own peofile....
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});
// get the all profoile ...
const getUserAllProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserAllProfileFromDB(user.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

// @apiend: api/v1/connections/search?query=abc
// @method: get
const searchUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.query as { query: string };
      const currentUserId = req.user.id;

      const users = await UserService.searchUsersService({
        query,
        currentUserId,
      });
      console.log(users);
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: query
          ? 'Users fetched successfully!'
          : 'No search query provided',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const UserController = {
  createUser,
  getUserProfile,
  updateProfile,
  searchUsers,
  getUserAllProfile,
};
