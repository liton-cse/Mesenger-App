import { Document, Types } from 'mongoose';

export enum GROUP_ROLE {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface IGroupMember extends Document {
  conversationId: Types.ObjectId; // The group conversation
  userId: Types.ObjectId; // The user in the group
  role: GROUP_ROLE; // Admin or Member
  joinedAt: Date; // When user joined
  leftAt?: Date; // When user left (if applicable)
  isMuted: boolean; // Mute notifications for this group
}
