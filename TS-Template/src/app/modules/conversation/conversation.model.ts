import mongoose, { Schema } from 'mongoose';
import { IConversation } from './conversation.interface';

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    conversationKey: { type: String }, // used only for 1-to-1
    isGroup: { type: Boolean, default: false },

    groupName: { type: String },
    groupImage: { type: String },
    adminIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    lastMessage: { type: String },
  },
  { timestamps: true }
);

// ✅ Ensure 1-to-1 conversations are unique
ConversationSchema.index(
  { conversationKey: 1 },
  { unique: true, sparse: true }
);

// ✅ Pre-save hook: generate composite key for 1-to-1
ConversationSchema.pre('validate', function (next) {
  if (!this.isGroup && this.participants.length === 2) {
    const sorted = this.participants.map(String).sort();
    this.conversationKey = `${sorted[0]}_${sorted[1]}`;
  } else {
    this.conversationKey = undefined; // not used for groups
  }
  next();
});

export const ConversationModel = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema
);
