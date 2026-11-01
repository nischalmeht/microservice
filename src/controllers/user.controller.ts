import type { Request, Response } from 'express';
import { User } from '../models/user.model';
import { ApiError } from '../utils/api-error';

const findUser = async (id: string) => {
  const user = await User.findById(id).exec();
  if (!user) throw new ApiError('No such user exists!', 404, true);
  return user;
};

/** GET /api/users */
export const list = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip ?? 0);
  const limit = Number(req.query.limit ?? 50);
  res.json(await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec());
};

/** GET /api/users/:userId */
export const get = async (req: Request<{ userId: string }>, res: Response) => {
  res.json(await findUser(req.params.userId));
};

/** POST /api/users */
export const create = async (req: Request, res: Response) => {
  const { username, mobileNumber } = req.body;
  res.status(201).json(await User.create({ username, mobileNumber }));
};

/** PUT /api/users/:userId */
export const update = async (req: Request<{ userId: string }>, res: Response) => {
  const user = await findUser(req.params.userId);
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  res.json(await user.save());
};

/** DELETE /api/users/:userId */
export const remove = async (req: Request<{ userId: string }>, res: Response) => {
  const user = await findUser(req.params.userId);
  await user.deleteOne();
  res.json(user);
};
