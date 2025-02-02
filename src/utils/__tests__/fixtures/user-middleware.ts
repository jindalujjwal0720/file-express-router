import { Request, Response } from 'express';

export const middleware = async (req: Request, res: Response) => {
  res.send('middleware');
};
