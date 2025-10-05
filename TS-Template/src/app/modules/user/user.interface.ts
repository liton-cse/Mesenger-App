import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
export type IMessageRequestStatus = 'pending' | 'approved' | 'denied';
export type IUser = {
  name: string;
  role: USER_ROLES;
  email: string;
  password: string;
  image?: string;
  status: 'active' | 'deleted' | 'blocked';
  verified: boolean;
  fcmToken: string;
  onlineStatus: 'online' | 'offline';
  lastSeen: Date;
  MessageRequestStatus?: IMessageRequestStatus;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
