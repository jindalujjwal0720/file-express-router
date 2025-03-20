import { RequestHandler } from 'express';

export const handler: RequestHandler = (req, res) => {
  console.log('Hello Index Page!');
  res.send('Hello Index Page!');
};
