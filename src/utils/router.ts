import { generateFileStructure } from './files';
import { registerRoutes } from './handler';
import { blue, green } from './logs';
import { Router as ExpressRouter } from 'express';

interface RouterOptions {
  /**
   * The directory to load the routes from.
   */
  dir: string;
  /**
   * Whether to log requests or not.
   */
  logger?: boolean;
  /**
   * Allowed file extensions to load as routes.
   * @default ['.ts', '.js']
   */
  include?: string[];
}

export let GLOBAL_OPTIONS: RouterOptions = {
  dir: '',
  logger: true,
  include: ['.ts', '.js'],
};

export const Router = async (options: RouterOptions) => {
  const start = Date.now();
  GLOBAL_OPTIONS = { ...GLOBAL_OPTIONS, ...options };

  const entries = generateFileStructure(GLOBAL_OPTIONS.dir);
  const router = ExpressRouter();

  if (GLOBAL_OPTIONS.logger) {
    router.use((req, _res, next) => {
      console.log(blue(`[file-express-router]`), green(req.method), req.path);
      next();
    });
  }

  await registerRoutes(router, entries);

  console.log(
    blue(`[file-express-router]`),
    `Router loaded in ${Date.now() - start}ms`,
  );

  return router;
};
