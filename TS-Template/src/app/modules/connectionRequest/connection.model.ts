import mongoose, { Schema } from 'mongoose';
import { IConnectionRequest, CONNECTION_STATUS } from './connection.interface';

const ConnectionSchema = new Schema<IConnectionRequest>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: Object.values(CONNECTION_STATUS),
      default: CONNECTION_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate requests (sender-receiver pair must be unique)
ConnectionSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export const ConnectionModel = mongoose.model<IConnectionRequest>(
  'Connection',
  ConnectionSchema
);
