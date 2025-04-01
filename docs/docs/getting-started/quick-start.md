---
sidebar_position: 2
---

# Quick Start Guide

This guide will help you quickly set up and use `file-express-router` in your Node.js project.

## Step 1: Install Dependencies

First, install `file-express-router` along with Express.js:

```bash
# Using npm
npm install file-express-router express

# Using yarn
yarn add file-express-router express
```

## Step 2: Set Up Your Project Structure

Create a new project directory and initialize a Node.js project:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

Create the following folder structure:

```
my-express-app/
├── routes/
│   ├── status.get.ts
│   └── users/
│       └── [id].get.ts
├── app.ts
└── package.json
```

## Step 3: Configure file-express-router

Add the following code to `app.ts`:

```typescript title="app.ts"
import express from 'express';
import path from 'path';
// highlight-next-line
import { Router } from 'file-express-router';

const startServer = async () => {
  const app = express();

  // highlight-start
  const routesDir = path.join(__dirname, 'routes');
  const router = await Router({ dir: routesDir });
  app.use('/api', router);
  // highlight-end

  app.listen(6969, () => {
    console.log('Server is running on http://localhost:6969');
  });
};

startServer();
```

## Step 4: Create Routes

```typescript title="routes/status.get.ts"
import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  res.json({ message: 'Ping Pong!' });
};

export default handler;
```

```typescript title="routes/users/[id].get.ts"
import { RequestHandler } from 'express';

const handler: RequestHandler = (req, res) => {
  res.json({ userId: req.params.id });
};

export default handler;
```

## Step 5: Start Your Server

Run the following command to start your Express server:

```bash
npx ts-node app.ts
```

**Note:** If you are using **nodemon**, you have to ignore the `routes/index.ts` and `routes/index.js` files to prevent nodemon from restarting the server on file changes in the `routes` directory.

## Step 6: Test Your API

Use a browser or API client to test the routes:

- `GET http://localhost:6969/api/status` → `{ "message": "Ping Pong!" }`
- `GET http://localhost:6969/api/users/123` → `{ "userId": "123" }`

That's it! You have successfully set up `file-express-router` in your Node.js project.
