import mongoose, { Schema, model } from 'mongoose';
import { IMessage, MESSAGE_STATUS, MESSAGE_TYPE } from './message.interface';

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: Object.values(MESSAGE_TYPE),
      default: MESSAGE_TYPE.TEXT,
    },
    content: { type: String },
    media: {
      imageUrl: String,
      videoUrl: String,
      audioUrl: String,
      duration: Number,
    },
    status: {
      type: String,
      enum: Object.values(MESSAGE_STATUS),
      default: MESSAGE_STATUS.SENT,
    },
  },
  { timestamps: true }
);

// Index for fast retrieval by conversation
MessageSchema.index({ conversationId: 1, createdAt: 1 });

export const MessageModel = model<IMessage>('Message', MessageSchema);
