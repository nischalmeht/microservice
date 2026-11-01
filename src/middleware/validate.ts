import type { NextFunction, Request, Response } from 'express';
import type Joi from 'joi';
import { ApiError } from '../utils/api-error';

export interface ValidationSchema {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
}

/** Validates request parts against Joi schemas; replaces `req.body` with the cleaned value. */
export const validate =
  (schema: ValidationSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const messages: string[] = [];

    for (const key of ['body', 'params', 'query'] as const) {
      const part = schema[key];
      if (!part) continue;
      const { error, value } = part.validate(req[key], { abortEarly: false, stripUnknown: true });
      if (error) {
        messages.push(error.message);
      } else if (key === 'body') {
        req.body = value;
      }
    }

    if (messages.length > 0) {
      return next(new ApiError(messages.join(' and '), 400, true));
    }
    return next();
  };
