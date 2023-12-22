import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: false,
      },
    ],
  },
  { timestamps: true },
); // timestamps to add created_at and updated_at

export const Usermodel =
  mongoose.models.User || mongoose.model('User', userSchema);
