import { Request, Response } from 'express';
import { Usermodel } from '../models';

export async function followUser(req: Request, res: Response) {
  try {
    const followUserId = req.params.followUserId;
    const userId = req.user._id;

    // increse the following count
    await Usermodel.updateOne(
      { _id: userId },
      { $push: { following: followUserId } },
    );

    // increse the follower count of the followedUser
    await Usermodel.updateOne(
      { _id: followUserId },
      { $push: { followers: userId } },
    );

    // some other extra logic can also be implemented after that e,g; sending notification to both the users
    return res
      .status(201)
      .json({ message: 'you started folowing', followUserId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
