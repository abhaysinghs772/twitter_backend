import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usermodel } from '../models';
import { createUserBody } from '../interfaces/user/createUser.body';

export async function signUp(req: Request, res: Response) {
  try {
    const incomingBody: createUserBody = req.body;

    // check whether user already exist in db or not if not then save it in Db
    const userExist = await Usermodel.findOne({
      userName: incomingBody.userName,
    });

    if (userExist) {
      // throw error
      return res.status(400).json({ error: 'user already exist !' });
    }

    const hashedPassword = await bcrypt.hash(incomingBody.password, 10);
    incomingBody.password = hashedPassword;
    await Usermodel.create({ ...incomingBody });

    return res.status(201).json({ message: 'user signed up successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    // Check if the user exists
    const user = await Usermodel.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // sign token
    const secret = process.env.JWT_SECRET as string;
    const token = await jwt.sign({ user: user }, secret, {
      expiresIn: '4h',
    });

    res.status(200).json({ message: 'successfully logged in', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
