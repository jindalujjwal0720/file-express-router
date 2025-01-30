import express from 'express';
import { Router } from './utils/router';
import path from 'path';

const createServer = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const router = await Router({
    dir: path.join(__dirname, 'dev-routes'),
    logger: true,
  });
  app.use('/api', router);

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
};

createServer();
