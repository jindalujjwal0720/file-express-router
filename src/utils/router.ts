import * as e from 'express';
import { generateFileStructure } from './files';
import { registerRoutes } from './handler';

interface RouterOptions {
  base: string;
  dir: string;
}

const router = async (app: e.Express, options: RouterOptions) => {
  const router = e.Router();
  const entries = generateFileStructure(options.dir);

  router.get('/', (req, res) => {
    res.json(entries);
  });

  await registerRoutes(router, entries);

  app.use(options.base ?? '/', router);
};

export const fexpress = router;
