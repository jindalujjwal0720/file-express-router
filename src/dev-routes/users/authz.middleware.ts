import { NextFunction, Request, Response } from 'express';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    res.status(401).send('Unauthorized');
    return;
  }
  console.log('Authorized');

  next();
};

export default authorize;
