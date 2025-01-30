import { Request, Response } from 'express';

export const handler = (error: Error, _: Request, res: Response) => {
  console.error(error);
  res.status(500).json({ error: error });
};
