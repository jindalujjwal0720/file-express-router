import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
  res.send('get');
};
