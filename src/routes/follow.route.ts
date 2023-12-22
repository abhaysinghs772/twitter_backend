import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { validatePathParam } from '../middlewares';
import { followUser } from '../controllers';

const followRoute = Router();

followRoute.post(
  '/api/v1/followUser/:followUserId',
  authMiddleware,
  validatePathParam,
  followUser,
);

export { followRoute };
