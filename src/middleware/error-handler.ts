import { STATUS_CODES } from 'node:http';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import { env } from '../config/env';
import { ApiError } from '../utils/api-error';

export const notFound: RequestHandler = (_req, _res, next) => {
  next(new ApiError('API not found', 404, true));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let isPublic = false;

  if (err instanceof ApiError) {
    ({ status, isPublic } = err);
  } else if (err?.name === 'ValidationError') {
    // mongoose schema validation
    status = 400;
    isPublic = true;
  } else if (typeof err?.status === 'number' && err.status >= 400 && err.status < 500) {
    // e.g. malformed JSON from express.json()
    status = err.status;
    isPublic = true;
  }

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    message: isPublic ? err.message : STATUS_CODES[status],
    ...(env.NODE_ENV === 'development' && { stack: err?.stack }),
  });
};
