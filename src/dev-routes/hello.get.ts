import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  res.send('Hello Page!');
};

export default handler;
