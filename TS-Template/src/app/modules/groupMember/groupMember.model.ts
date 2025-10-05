import mongoose, { Schema } from 'mongoose';
import { IGroupMember, GROUP_ROLE } from './groupMember.interface';

const GroupMemberSchema = new Schema<IGroupMember>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
      type: String,
      enum: Object.values(GROUP_ROLE),
      default: GROUP_ROLE.MEMBER,
    },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date },
    isMuted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate membership
GroupMemberSchema.index({ conversationId: 1, userId: 1 }, { unique: true });

export const GroupMemberModel = mongoose.model<IGroupMember>(
  'GroupMember',
  GroupMemberSchema
);
