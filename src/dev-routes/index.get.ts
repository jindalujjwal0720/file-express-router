import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  console.log('Hello Index Page!');
  res.send('Hello Index Page!');
};

export default handler;
