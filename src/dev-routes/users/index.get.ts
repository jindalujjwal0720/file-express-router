import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  res.json({ message: 'Hello Index Page!' });
};

export default handler;
