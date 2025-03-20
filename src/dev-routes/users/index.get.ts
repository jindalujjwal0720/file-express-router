import { RequestHandler } from 'express';

export const handler: RequestHandler = (req, res) => {
  res.json({ message: 'Hello Index Page!' });
};
