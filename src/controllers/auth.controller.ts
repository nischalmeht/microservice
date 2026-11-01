import { createHash, timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/api-error';

const digest = (value: string) => createHash('sha256').update(value).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));

/**
 * POST /api/auth/login
 * Placeholder authentication: compares against AUTH_USERNAME / AUTH_PASSWORD from the
 * environment. Replace with a real user lookup (hashed passwords) before production use.
 */
export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const valid = safeEqual(username, env.AUTH_USERNAME) && safeEqual(password, env.AUTH_PASSWORD);
  if (!valid) throw new ApiError('Authentication error', 401, true);

  const token = jwt.sign({ username }, env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });
  res.json({ token, username });
};

/** GET /api/auth/random-number (protected) */
export const getRandomNumber = (_req: Request, res: Response) => {
  res.json({ user: res.locals.auth, num: Math.random() * 100 });
};
