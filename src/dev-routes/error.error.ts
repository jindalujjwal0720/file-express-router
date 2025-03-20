import { ErrorRequestHandler } from 'express';

export const handler: ErrorRequestHandler = (error, req, res, _next) => {
  res.status(500).json({ error: error });
};
