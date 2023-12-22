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
  },
  { timestamps: true },
); // timestamps to add created_at and updated_at

const Usermodel = mongoose.models.User || mongoose.model('User', userSchema);

export default Usermodel;
