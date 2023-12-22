import mongoose, { Schema } from 'mongoose';

const tweetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
); // timestamps to add created_at and updated_at

export const Tweetmodel =
  mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);
