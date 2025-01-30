---
sidebar_position: 1
---

# Installation

To get started with `file-express-router`, you need to install it as a dependency in your Node.js project. Follow these steps:

### Step 1: Install the Package

You can install File Express Router using npm or yarn:

```bash
// Using npm
npm install file-express-router

// Using yarn
yarn add file-express-router
```

### Step 2: Install peer dependencies

File Express Router requires **Express.js** as a peer dependency. If you don’t already have Express installed, add it to your project:

```bash
// Using npm
npm install express

// Using yarn
yarn add express
```

### Step 3: Verify Installation

After installation, you can verify that the package is installed correctly by checking your `package.json` file. It should include `file-express-router` and `express` in the dependencies section.

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "file-express-router": "^1.0.0"
  }
}
```

That’s it! You have successfully installed File Express Router in your Node.js project. You can now start using it to create routes based on file structure.

### Step 4: Set Up Your Project

Once installed, you’re ready to set up your project. Here’s a minimal example to get started:

1. Create a new directory for your project (if you haven’t already):

```bash
mkdir my-express-app
cd my-express-app
```

2. Initialize a new Node.js project (if you haven’t already):

```bash
npm init -y
```

3. Create the following folder structure:

```
my-express-app/
├── routes/
│   ├── status.ts
│   └── users/
│       └── [id].ts
├── app.ts
└── package.json
```

4. Add the following code to `app.ts`:

```typescript
import express from 'express';
// highlight-next-line
import { Router } from 'file-express-router';

const startServer = async () => {
  const app = express();

  // highlight-start
  const routesDir = `${__dirname}/routes`;
  const router = await Router({ dir: routesDir });
  app.use('/api', router);
  // highlight-end

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
};

startServer();
```

5. Add a simple route in `routes/status.ts`:

```typescript
import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.json({ message: 'Ping Pong!' });
};
```

6. Add a dynamic route in `routes/users/[id].ts`:

```typescript
import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.json({ userId: req.params.id });
};
```

7. Start your server:

```bash
npx ts-node app.ts
```

8. Test your routes:

- Open http://localhost:3000/api/status in your browser or API client.
- Open http://localhost:3000/api/users/123 in your browser or API client.
