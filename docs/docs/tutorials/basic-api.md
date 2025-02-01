---
sidebar_position: 1
---

# Basic API Server

In this tutorial, you’ll learn how to set up a basic API server using File Express Router. By the end, you’ll have a working server with a few routes to handle HTTP requests.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- npm or yarn
- TypeScript (optional but recommended)
- A willingness to learn!

### Step 1: Initialize Your Project

1. Create a new directory for your project:

   ```bash
   mkdir basic-api-server
   cd basic-api-server
   ```

2. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install the required dependencies:

   ```bash
   npm install express file-express-router
   ```

4. If you’re using TypeScript, install TypeScript and the necessary types:

   ```bash
   npm install --save-dev typescript @types/express
   ```

5. Initialize a `tsconfig.json` file (if using TypeScript):

   ```bash
   npx tsc --init
   ```

### Step 2: Set Up the Project Structure

Create the following folder structure:

```
basic-api-server/
├── routes/
│   ├── index.ts
│   └── users/
│       └── [id].ts
├── app.ts
├── package.json
└── tsconfig.json (if using TypeScript)
```

### Step 3: Create the Entry Point (app.ts)

In the root of your project, create an `app.ts` file with the following code:

```typescript
import express from 'express';
import { Router } from 'file-express-router';

const startServer = async () => {
  const app = express();

  // Define the directory for routes
  const routesDir = `${__dirname}/routes`;

  // Initialize the router
  const router = await Router({ dir: routesDir });

  // Mount the router under the `/api` prefix
  app.use('/api', router);

  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
```

### Step 4: Create Your First Route

Inside the `routes` directory, create an `index.ts` file with a simple route:

```typescript
import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.json({ message: 'Welcome to the Basic API Server!' });
};
```

This will handle `GET` requests to `/api/`.

### Step 5: Add a Dynamic Route

Inside the `routes/users` directory, create a `[id].ts` file to handle dynamic parameters:

```typescript
import { RequestHandler } from 'express';

export const get: RequestHandler = (req, res) => {
  res.json({ userId: req.params.id });
};
```

This will handle `GET` requests to `/api/users/:id`.

### Step 6: Start the Server

Run your server using `ts-node` (or compile and run with `node` if you’ve set up a build process):

```bash
npx ts-node app.ts
```

### Step 7: Test Your API

1. Open your browser or use a tool like **Postman** or **curl**.
2. Visit `http://localhost:3000/api/` to see the response from the `index.ts` route:
   ```json
   { "message": "Welcome to the Basic API Server!" }
   ```
3. Visit `http://localhost:3000/api/users/123` to test the dynamic route:
   ```json
   { "userId": "123" }
   ```

### Step 8: Add More Routes

You can now add more routes by creating files in the `routes` directory. For example:

- `routes/posts/index.ts` → `/api/posts`
- `routes/posts/[slug].ts` → `/api/posts/:slug`
- `routes/admin/dashboard.ts` → `/api/admin/dashboard`

### Step 9: Add Middleware (Optional)

To add middleware, create a `_middleware.ts` file in any directory. For example, in `routes/users/_middleware.ts`:

```typescript
import { RequestHandler } from 'express';

export const middleware: RequestHandler = (req, res, next) => {
  console.log('Middleware running for /api/users routes');
  next();
};
```

This middleware will run for all routes under `/api/users`.

### Step 10: Add Error Handling (Optional)

To handle errors, create an `_error.ts` file in any directory. For example, in `routes/_error.ts`:

```typescript
import { ErrorRequestHandler } from 'express';

export const handler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
};
```

## Final Project Structure

```
basic-api-server/
├── routes/
│   ├── index.ts
│   ├── users/
│   │   ├── [id].ts
│   │   └── _middleware.ts
│   └── _error.ts
├── app.ts
├── package.json
└── tsconfig.json (if using TypeScript)
```

You’ve now built a **basic API server** using **File Express Router**!
