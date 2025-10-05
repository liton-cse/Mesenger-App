import { Document, Types } from 'mongoose';

export enum NOTIFICATION_TYPE {
  CONNECTION_REQUEST = 'CONNECTION_REQUEST',
  MESSAGE = 'MESSAGE',
  SYSTEM = 'SYSTEM',
}

export interface INotification extends Document {
  userId: Types.ObjectId;
  type: NOTIFICATION_TYPE;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
