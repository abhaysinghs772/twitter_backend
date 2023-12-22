import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export async function validatePathParam(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const paramSchema = Joi.string().required();

  const { error } = paramSchema.validate(req.body);

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
