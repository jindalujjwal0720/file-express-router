import { generateFolderStructure } from './files';
import { green, logger } from './logs';
import { Router as ExpressRouter } from 'express';
import { generateRouter } from './main';

interface RouterOptions {
  /**
   * The directory to load the routes from.
   */
  dir: string;
  /**
   * Whether to log requests or not.
   * @default true
   */
  logger?: boolean;
  /**
   * Allowed file extensions to load as routes.
   * @default ['.ts', '.js']
   */
  include?: string[];
  /**
   * Router file generation options.
   * @default { require: false, ts: false }
   */
  router?: {
    /**
     * Whether to use require instead of import.
     * @default false
     */
    require?: boolean;
    /**
     * Whether to generate TypeScript code.
     * @default true
     */
    ts?: boolean;
  };
}

export let GLOBAL_OPTIONS: RouterOptions = {
  dir: '',
  logger: true,
  include: ['.ts', '.js'],
  router: {
    require: false,
    ts: true,
  },
};

export const Router = async (options: RouterOptions) => {
  GLOBAL_OPTIONS = {
    ...GLOBAL_OPTIONS,
    ...options,
    router: { ...GLOBAL_OPTIONS.router, ...options.router },
  };
  const router = ExpressRouter();

  if (GLOBAL_OPTIONS.logger) {
    logger.enable();
    logger.log('Logger enabled');
    router.use((req, res, next) => {
      logger.log(green(req.method), req.path);
      next();
    });
  }

  logger.startTimer('Folder structure generation');
  const entries = await generateFolderStructure(GLOBAL_OPTIONS.dir);
  logger.logTimer('Folder structure generation');

  if (GLOBAL_OPTIONS.include?.includes('.js')) {
    logger.warn(
      'For using JavaScript files, make sure to set the `allowJs` option in your tsconfig.json',
    );
  }

  // Take these routes and register them with the router.
  // This is where the magic happens.
  logger.startTimer('Router generation');
  const apiRouter = await generateRouter(entries);
  logger.logTimer('Router generation');

  router.use(apiRouter);

  return router;
};
