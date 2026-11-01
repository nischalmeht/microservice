import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/api-error';

/** Requires `Authorization: Bearer <token>`; exposes the payload on `res.locals.auth`. */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError('Authentication required', 401, true));
  }

  try {
    res.locals.auth = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
    return next();
  } catch {
    return next(new ApiError('Invalid or expired token', 401, true));
  }
};
