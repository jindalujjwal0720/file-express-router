import { NextFunction, Request, Response, Router } from 'express';
import { FileSystemEntry } from './files';

const RESERVED_NAMES = ['_handler'];

export type GlobalHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: () => void,
) => void;

export const getGlobalHandler = async (source: string) => {
  if (!source) return undefined;
  const handler = await import(source);
  return handler.handler as GlobalHandler;
};

export const isParameter = (segment: string): [boolean, string] => {
  const regex = /^\[(\w+)\]$/;
  const match = segment.match(regex);
  if (match) {
    return [true, match[1]];
  }
  return [false, segment];
};

export const registerHandler = async (
  router: Router,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  route: string,
  handler: () => void,
  globalHandler: GlobalHandler | undefined,
) => {
  if (!handler) return;
  if (globalHandler) {
    router[method](route, (req, res, next) => {
      globalHandler(req, res, next, handler);
    });
  } else {
    router[method](route, handler);
  }
};

export const registerRoute = async (
  router: Router,
  entry: FileSystemEntry,
  globalHandler: GlobalHandler | undefined,
) => {
  if (RESERVED_NAMES.includes(entry.name)) {
    return;
  }

  const [isParam, name] = isParameter(entry.name);
  const route = isParam ? `/:${name}` : `/${entry.name}`;

  if (entry.type === 'directory') {
    const childRouter = Router();
    await registerRoutes(childRouter, entry.children, globalHandler);
    router.use(route, childRouter);
    return;
  }

  const file = await import(entry.path);
  const { get, post, put, patch, delete: del } = file;

  await registerHandler(router, 'get', route, get, globalHandler);
  await registerHandler(router, 'post', route, post, globalHandler);
  await registerHandler(router, 'put', route, put, globalHandler);
  await registerHandler(router, 'patch', route, patch, globalHandler);
  await registerHandler(router, 'delete', route, del, globalHandler);
};

export const registerRoutes = async (
  router: Router,
  entries: FileSystemEntry[],
  rootHandler?: GlobalHandler,
) => {
  const globalHandlerSource = entries.find(
    (entry) => entry.name === '_handler',
  );
  const globalHandler =
    (await getGlobalHandler(globalHandlerSource?.path ?? '')) ?? rootHandler;

  for (const entry of entries) {
    await registerRoute(router, entry, globalHandler);
  }
};
