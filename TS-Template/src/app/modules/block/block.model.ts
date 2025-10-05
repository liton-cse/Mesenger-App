import mongoose, { Schema } from 'mongoose';
import { IBlock } from './block.interface';

const BlockSchema = new Schema<IBlock>(
  {
    blockerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    blockedId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate block entries
BlockSchema.index({ blockerId: 1, blockedId: 1 }, { unique: true });

export const BlockModel = mongoose.model<IBlock>('Block', BlockSchema);
