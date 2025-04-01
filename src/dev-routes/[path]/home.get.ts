import { Request, Response } from 'express';

const handleGetHome = async (req: Request, res: Response) => {
  const { path } = req.params;
  console.log('path', path);
  res.json({ path, message: 'Hello World!' });
};

export default handleGetHome;
