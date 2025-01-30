import { generateFileStructure } from './files';
import { registerRoutes } from './handler';
import { blue, green } from './logs';
import express from 'express';

interface RouterOptions {
  dir: string;
  logger?: boolean;
}

export let GLOBAL_OPTIONS = {
  dir: '',
  logger: true,
};

export const Router = async (options: RouterOptions) => {
  const start = Date.now();
  GLOBAL_OPTIONS = { ...GLOBAL_OPTIONS, ...options };

  const entries = generateFileStructure(options.dir);
  const router = express.Router();

  if (GLOBAL_OPTIONS.logger) {
    router.use((req, _res, next) => {
      console.log(blue(`[file-express-router]`), green(req.method), req.path);
      next();
    });
  }

  await registerRoutes(router, entries);

  if (GLOBAL_OPTIONS.logger) {
    console.log(
      blue(`[file-express-router]`),
      `Router loaded in ${Date.now() - start}ms`,
    );
  }

  return router;
};
