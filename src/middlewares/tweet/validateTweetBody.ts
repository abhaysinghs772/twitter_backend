import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export async function createTweetBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validateTweetBodySchema = Joi.object({
    title: Joi.string().min(0).max(50).required(), // max 50 characters for the title/heading
    description: Joi.string().min(0).max(500),
  });

  const { error } = validateTweetBodySchema.validate(req.body);

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
