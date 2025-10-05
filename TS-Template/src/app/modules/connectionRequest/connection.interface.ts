import { Document, Types } from 'mongoose';

export enum CONNECTION_STATUS {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface IConnectionRequest extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: CONNECTION_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
