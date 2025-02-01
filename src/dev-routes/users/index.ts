import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.json({ message: 'Hello Index Page!' });
};
