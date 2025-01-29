import express from 'express';
import fexpress from 'fexpress';
import path from 'path';

const createServer = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  await fexpress(app, {
    base: '/api',
    dir: path.join(__dirname, 'dev-routes'),
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
};

createServer();
