import { NextFunction, Request, Response } from 'express';

export const handler = async (
  req: Request & { user: boolean },
  _res: Response,
  next: NextFunction,
) => {
  req.user = true;

  next();
};
