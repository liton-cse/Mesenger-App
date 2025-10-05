import { Document, ObjectId } from 'mongoose';

export interface IConversation extends Document {
  participants: ObjectId[]; // User IDs
  conversationKey?: string; // Only used for 1-to-1 conversations
  isGroup: boolean; // Distinguishes private vs group
  groupName?: string; // For group chats
  groupImage?: string; // Optional group avatar
  adminIds?: string[]; // Group admins
  lastMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
