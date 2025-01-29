import { NextFunction, Request, Response } from 'express';

export type HandlerFunction = (...args: unknown[]) => Promise<unknown>;

export const handler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: HandlerFunction,
) => {
  const result = await handler(req.params);
  res.json(result);
};
