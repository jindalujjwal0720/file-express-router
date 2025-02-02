import { NextFunction, Request, Response } from 'express';

const authenticate = async (
  req: Request & { user: boolean },
  res: Response,
  next: NextFunction,
) => {
  req.user = true;
  console.log('Authenticated');
  next();
};

const authorize = async (
  req: Request & { user: boolean },
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  console.log('Authorized');

  next();
};

export const handler = [authenticate, authorize];
