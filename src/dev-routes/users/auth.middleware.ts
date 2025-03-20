import { NextFunction, Request, Response } from 'express';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.user = true;
  console.log('Authenticated');
  next();
};

export const handler = authenticate;
