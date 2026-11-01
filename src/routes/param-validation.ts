import Joi from 'joi';
import { MOBILE_NUMBER_PATTERN } from '../models/user.model';

const userId = Joi.object({ userId: Joi.string().hex().length(24).required() });
const userBody = Joi.object({
  username: Joi.string().required(),
  mobileNumber: Joi.string().pattern(MOBILE_NUMBER_PATTERN).required(),
});

export const paramValidation = {
  // POST /api/users
  createUser: { body: userBody },

  // GET|DELETE /api/users/:userId
  userById: { params: userId },

  // PUT /api/users/:userId
  updateUser: { body: userBody, params: userId },

  // GET /api/users
  listUsers: {
    query: Joi.object({
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(100).default(50),
    }),
  },

  // POST /api/auth/login
  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
