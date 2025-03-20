---
sidebar_position: 1
---

# Introduction

Welcome to the `file-express-router` documentation! This library is a simple, easy-to-use, lightweight, zero-configuration file-based routing system for Express.js. It allows you to define your routes in separate files and directories, making your codebase more organized and easier to maintain.

## What is file-based routing?

File-based routing is a routing system where each route is defined in a separate file or directory. This approach makes it easier to manage your routes, as you can organize them into logical groups and keep them separate from your main application code.

With `file-express-router`, you can define your routes in separate files and directories, and the library will automatically load and register them with Express.js. This makes it easy to add, remove, and modify routes without having to touch your main application code.

```bash
routes/
├── users/             →  GET    /users
│   ├── [id]/          →  GET    /users/:id
│   │   └── posts/     →  GET    /users/:id/posts
│   └── active/        →  GET    /users/active
├── auth/
│   ├── login/         →  POST   /auth/login
│   └── register/      →  POST   /auth/register
└── health/            →  GET    /health
```

## Why use it?

1. **Zero configuration**: No need to set up complex routing configurations. Just define your routes in separate files and directories, and the library will take care of the rest.

   ```ts title="app.ts"
   import { Router } from 'file-express-router';
   import express from 'express';
   import path from 'path';

   const startServer = async () => {
     const app = express();

     // highlight-start
     const router = await Router({
       dir: path.join(__dirname, 'routes'),
     });
     app.use(router);
     // highlight-end

     app.listen(6969, () => {
       console.log('Server is running on port 6969');
     });
   };

   startServer();
   ```

2. **Organized codebase**: Keep your routes organized in separate files and directories, making it easier to find and manage them. No more scrolling through a single file to find a specific route.

   ```bash
   routes/
   ├── users/
   │   ├── [id]/
   │   │   └── posts/
   │   └── active/
   ├── auth/
   │   ├── login/
   │   └── register/
   └── health/
   ```

3. **Built-in features**: `file-express-router` comes with built-in support for route parameters, middleware, error handling, and more. You can take advantage of these features without having to write additional code.

   - 🚀 Automatic route registration
   - 🎯 Automatic routes index file generation
   - 📂 Nested routes
   - 🔄 Dynamic route parameters
   - 🛡️ Middleware support
   - ⚠️ Error middleware support
   - 📝 HTTP method based routing
   - 🔒 Secure 404 handling

4. **Developer Experience**: Improve your development workflow by separating concerns and focusing on writing clean, modular routes. Spend less time configuring routing and more time building your application.

   - TypeScript support out of the box
   - Modular routes
   - Easy to search, navigate, and maintain routes (grep friendly)
   - Easy to add, remove, and modify routes
   - Clear separation of concerns
   - Simple and intuitive API

## Key Features

### Automatic Route Registration

Define your routes in separate files and directories, and the library will automatically load and register them with Express.js without any additional configuration. This makes it easy to add, remove, and modify routes without having to touch your main application code.

    ```ts title="routes/products/featured.get.ts"
    // Automatically available at: GET /products/featured
    export const handler = (req, res) => {
        res.json({ featured: [] });
    };
    ```

    ```ts title="routes/products/featured.post.ts"
    // Automatically available at: POST /products/featured
    export const handler = (req, res) => {
        res.status(405).send('Method Not Allowed');
    };
    ```

### Dynamic Parameters

Easily define dynamic route parameters in your route files using square brackets `[]`. The library will automatically parse and extract these parameters from the request URL.

    ```ts title="routes/users/[id].get.ts"
    // Automatically available at: GET /users/:id
    export const handler = (req, res) => {
        const { id } = req.params;
        res.json({ id });
    };
    ```

### Directory level middleware

Apply middleware at the directory level to run middleware for all routes within that directory. This allows you to define common middleware for a group of routes without having to repeat it for each route.

    ```ts title="routes/users/index.middleware.ts"
    // Middleware applied to all routes in the 'users' directory
    export const handler = (req, res, next) => {
        console.log('Middleware for all user routes');
        next();
    };
    ```

### Error middleware

Define error middleware to handle errors that occur during route processing. This allows you to centralize error handling logic and keep your route files clean and focused on route logic.

    ```ts title="routes/index.error.ts"
    // Error middleware to handle errors
    export const handler = (err, req, res, next) => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    };
    ```

## Comparison with Other Libraries

`file-express-router` is not the only library that provides file-based routing for Express.js. Here's a quick comparison with some other popular libraries:

| Feature             | File Express Router | Express Router  | Next.js API Routes  |
| ------------------- | ------------------- | --------------- | ------------------- |
| File-System Routing | ✅ Auto routes      | ❌ Manual       | ✅ Auto routes      |
| Dynamic Parameters  | ✅ `[param]` syntax | ✅ `:param`     | ✅ `[param]` syntax |
| Middleware Support  | ✅ File-level       | ✅ Manual       | ❌ Limited          |
| TypeScript Support  | ✅ Native           | ✅ Works        | ✅ Native           |
| Error Middleware    | ✅ Dedicated        | ❌ Manual       | ❌ Manual           |
| Route Guards        | ✅ Middleware-based | ❌ Manual       | ❌ Manual           |
| Route Groups        | ✅ Directory-based  | ❌ Manual       | ✅ Folder-based     |
| Customizability     | ✅ Full control     | ✅ Full control | ❌ Next.js only     |
| Performance         | ✅ Optimized        | ✅ Native       | ✅ Optimized        |
| Use Case            | Standalone APIs     | Custom setups   | Full-stack apps     |

Here's a quick summary of the pros and cons of each library:

| Library             | Pros                      | Cons                       |
| ------------------- | ------------------------- | -------------------------- |
| File Express Router | Auto routing, middleware  | Needs Express.js           |
| Express Router      | Full control, no overhead | Manual config, boilerplate |
| Next.js API Routes  | Integrated, easy to use   | Limited to Next.js         |

## When to use? (and when not to)

- **Use `file-express-router` if**:

  - You want a simple, lightweight, and zero-configuration file-based routing system for Express.js.
  - You prefer organizing your routes in separate files and directories.
  - You want built-in support for route parameters, middleware, error handling, and more.
  - You want to improve your development workflow by separating concerns and focusing on writing clean, modular routes.

- **Do not use `file-express-router` if**:
  - You need advanced routing features that are not supported by the library.
  - You prefer manual configuration and full control over your routing setup.
  - You are using a different framework or platform that does not support Express.js.
