import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('authorization');
    // Check if token is missing
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token?.split(' ')[1], secret) as JwtPayload;

    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
}
