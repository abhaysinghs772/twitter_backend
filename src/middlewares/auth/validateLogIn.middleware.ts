import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export async function logInValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logInSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = logInSchema.validate(req.body);

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
