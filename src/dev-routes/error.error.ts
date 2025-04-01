import { ErrorRequestHandler } from 'express';

const handler: ErrorRequestHandler = (error, req, res, _next) => {
  res.status(500).json({ error: error });
};

export default handler;
