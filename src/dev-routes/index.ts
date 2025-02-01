import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.send('Hello Index Page!');
};
