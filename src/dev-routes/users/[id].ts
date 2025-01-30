import { Request, Response, NextFunction } from 'express';

const handleGetUser = async (
  req: Request & { user: unknown },
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { user } = req;

  next({ id, user });
};

export const get = handleGetUser;
