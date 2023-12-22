import { Request, Response } from 'express';
import { Tweetmodel, Usermodel } from '../models';
import { createTweetBody } from '../interfaces';

export async function postTweet(req: Request, res: Response) {
  try {
    const saveTweetBody: createTweetBody = req.body;
    saveTweetBody.created_by = req.user._id;

    const savedTweet = await Tweetmodel.create(saveTweetBody);

    // update the user doc once tweet has been creeted
    await Usermodel.updateOne(
      { _id: req.user._id },
      { $push: { tweet: savedTweet._id } },
    );

    return res
      .status(201)
      .json({ message: 'post created successfully', savedTweet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function getAllTweets(req: Request, res: Response) {
  try {
    const userId = req.user._id;
    const user = await Usermodel.findById(userId);

    const followingIds = user.following;
    // Include the user's own ID in the list
    followingIds.push(userId);

    const allTweets = await Tweetmodel.find({
      created_by: { $in: followingIds },
    }).populate('created_by');

    return res
      .status(201)
      .json({ message: 'succcessfully fetched all tweets', allTweets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
