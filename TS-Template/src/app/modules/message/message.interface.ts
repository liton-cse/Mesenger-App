import { Document, Types } from 'mongoose';

// Message status enum
export enum MESSAGE_STATUS {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

// Message type enum
export enum MESSAGE_TYPE {
  TEXT = 'text',
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
}

// Interface for a single message
export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  type: MESSAGE_TYPE;
  content?: string;
  media?: {
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    duration?: number;
  };
  status: MESSAGE_STATUS;
  timestamp?: Date;
  createdAt: Date;
  updatedAt: Date;
}
