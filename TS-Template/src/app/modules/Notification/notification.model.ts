import mongoose, { Schema } from 'mongoose';
import { INotification, NOTIFICATION_TYPE } from './notification.interface';

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      required: true,
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Optimize notification lookup for a user
NotificationSchema.index({ userId: 1, isRead: 1 });

export const NotificationModel = mongoose.model<INotification>(
  'Notification',
  NotificationSchema
);
