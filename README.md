# File Express Router

File Express Router is a simple, unopinionated, fully typed, and lightweight file based router for Express.js. It allows you to create routes by simply creating files and folders in your project directory.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [with require](#with-require)
  - [with import](#with-import)
- [API](#api)
- [Examples and tutorials](#examples-and-tutorials)

  - [Basic](#basic)
  - [Multiple Methods](#multiple-methods)
  - [Dynamic Routes](#dynamic-routes)
  - [Nested Routes](#nested-routes)
  - [Custom Handlers](#custom-handlers)

## Installation

```bash
npm install file-express-router
```

## Features

- **Simple**: Create routes by simply creating files and folders in your project directory.
- **Unopinionated**: File Express Router does not enforce any specific structure for your routes.
- **Fully Typed**: File Express Router is written in TypeScript and provides full type support.
- **Lightweight**: File Express Router has no dependencies other than Express.js.
- **Flexible**: File Express Router allows you to define routes using any HTTP method supported by Express.js.
- **Custom handlers**: File Express Router allows you to define custom handlers for your routes, using `_handler` files.

## Usage

### with require

```javascript
// app.js
const express = require('express');
const router = require('file-express-router');

const createApp = async () => {
  const app = express();

  const routesDir = path.join(__dirname, 'routes');
  await router(app, {
    base: '/api',
    dir: routesDir,
  });

  app.listen(3000, () => console.log('Server is running on port 3000'));
};

createApp();
```

```javascript
// routes/hello.js
const sayHello = (req, res) => {
  res.send('Hello, World!');
};

module.exports = {
  get: sayHello,
};
```

### with import

```javascript
// app.js
import express from 'express';
import router from 'file-express-router';

const createApp = async () => {
  const app = express();

  const routesDir = path.join(__dirname, 'routes');
  await router(app, {
    base: '/api',
    dir: routesDir,
  });

  app.listen(3000, () => console.log('Server is running on port 3000'));
};

createApp();
```

```javascript
// routes/hello.js
const sayHello = (req, res) => {
  res.send('Hello, World!');
};

export const get = sayHello;
```

## API

```typescript
router(app: Express, options: RouterOptions): Promise<void>;
```

### RouterOptions

```typescript
interface RouterOptions {
  base?: string; // default: '/'
  dir: string;
}
```

## Examples and tutorials

In the following sections, we will provide examples and tutorials on how to use File Express Router to create routes in your Express.js application. We will cover everything from basic routes to more advanced topics like nested routes and custom handlers.

### Basic

In this example, we will create a simple route that responds with "Hello, World!" when a GET request is made to `/hello`.

```javascript
// routes/hello.js
const sayHello = (req, res) => {
  res.send('Hello, World!');
};

module.exports = {
  get: sayHello,
};
```

### Multiple Methods

In this example, we will create a route that responds with different messages based on the HTTP method used.

```bash
routes/
  └── comments.js
```

```javascript
// routes/comments.js
const getComments = (req, res) => {
  res.send('Get comments');
};

const postComment = (req, res) => {
  res.send('Post comment');
};

module.exports = {
  get: getComments,
  post: postComment,
};
```

### Dynamic Routes

In this example, we will create a dynamic route that responds with the value of a URL parameter. Dynamic routes are created by placing route files in directories with square brackets in their names.

```bash
routes/
  └── users/
      └── [id].js
```

```javascript
// routes/users/[id].js
const getUserById = (req, res) => {
  const { id } = req.params;
  res.send(`User ID: ${id}`);
};

module.exports = {
  get: getUserById,
};
```

### Nested Routes

In this example, we will create a nested route that responds with the value of a URL parameter. Nested routes are created by placing route files in nested directories.

```bash
routes/
    └── users/
        └── [id]/
            └── comments.js
        └── [id].js
```

```javascript
// routes/users/[id].js
const getUserById = (req, res) => {
  const { id } = req.params;
  res.send(`User ID: ${id}`);
};

module.exports = {
  get: getUserById,
};
```

```javascript
// routes/users/[id]/comments.js
const getComments = (req, res) => {
  const { id } = req.params;
  res.send(`Comments for user ID: ${id}`);
};

module.exports = {
  get: getComments,
};
```

### Custom Handlers

In this example, we will create a route that uses a custom handler to respond with a message.

To create a custom handler, create a file with the name `_handler.js` in the same directory as the route file. All the routes in that directory will use the custom handler, including nested routes.

```bash
routes/
  └── custom/
      ├── _handler.js
      └── message.js
```

```javascript
// routes/custom/_handler.js
const customHandler = async (req, res, next, handler) => {
  const body = req.body;
  await handler(body);
};

module.exports = {
  handler: customHandler,
};
```

```javascript
// routes/custom/message.js
const sendMessage = async (body) => {
  console.log(body);
};

module.exports = {
  post: sendMessage,
};
```
