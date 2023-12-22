import { ObjectId } from 'mongodb';

export interface createTweetBody {
  title: string;
  description: string;
  created_by: ObjectId;
}
