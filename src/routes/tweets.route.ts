import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';

import { createTweetBody } from '../middlewares';
import { postTweet, getAllTweets } from '../controllers';
const tweetRoute = Router();

tweetRoute.post('/api/v1/tweet', authMiddleware, createTweetBody, postTweet);
tweetRoute.get('/api/v1/tweets', authMiddleware, getAllTweets);

export { tweetRoute };
