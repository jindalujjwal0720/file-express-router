import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  res.send('Hello Index Page!');
};

export default handler;
