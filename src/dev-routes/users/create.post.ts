import { RequestHandler } from 'express';

export const handler: RequestHandler = (req, res) => {
  res.send('Hello Index Page!');
};
