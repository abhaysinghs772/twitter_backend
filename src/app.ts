import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

dotenv.config();

/* ROUTES */
import { authRoute, tweetRoute, followRoute } from './routes';

/* APP */
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* CONSUMING ALL ROUTES */
app.use(authRoute);
app.use(tweetRoute);
app.use(followRoute);

/* mongoDB connection */
// chnage this string to your own db's connection string
const uri = process.env.MONGO_URI as string;
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(0); // for clean exit if there would be any exception
  }
}

app.listen(3000, async () => {
  await connectDB();
  console.log(`server is up and running on port 3000`);
});
