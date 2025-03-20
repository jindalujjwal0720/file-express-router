# Middleware Management

Middleware in `file-express-router` allows you to handle requests and responses by adding layers of logic between the client and your route handlers. You can apply middleware at the directory, giving you flexibility and control over how you manage requests. Additionally, error handling is streamlined with built-in support for error middleware, and the order in which middleware is applied can be controlled.

## Directory-Level Middleware

You can apply middleware to all routes within a specific directory by placing a `index.middleware.ts` file in that directory. This is ideal for scenarios like user authentication or logging, where the same middleware logic should be applied to multiple routes.

Example:

```ts title="routes/users/index.middleware.ts"
export const handler = (req, res, next) => {
  console.log('Middleware applied to all user routes');
  next();
};
```

## Error Middleware

Error middlewares are just like regular middlewares, but they have an additional parameter for handling errors. You can define an error middleware function in a `index.error.ts` file within a route directory to handle errors that occur during request processing. This is useful for logging errors, sending custom error responses, or performing cleanup operations.

Example:

```ts title="routes/index.error.ts"
export const handler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
};
```

**Note:** Error middleware is defined in a `index.error.ts` file and is executed when an error is passed to the `next()` function. If the error is normally thrown, it will not be caught by the error middleware. Error middleware only runs when `next(err)` is called within a route or another middleware. Error middleware should have four parameters `(err, req, res, next)` to handle errors correctly.

## Multiple Middleware

You can apply multiple middleware functions to a route by defining an array of middleware functions in the `handler` property of the middleware file or by creating separate middleware files. This allows you to chain middleware functions together to process requests in a specific order.

Example using an array of middleware functions:

```ts title="routes/users/index.middleware.ts"
const authenticate = (req, res, next) => {
  console.log('Authenticating user...');
  next();
};

const authorize = (req, res, next) => {
  console.log('Authorizing user...');
  next();
};

export const handler = [authenticate, authorize];
```

Example using separate middleware files:

```ts title="routes/users/authenticate.middleware.ts"
export const handler = (req, res, next) => {
  console.log('Authenticating user...');
  next();
};
```

```ts title="routes/users/authorize.middleware.ts"
export const handler = (req, res, next) => {
  console.log('Authorizing user...');
  next();
};
```

In this example, the `authenticate` middleware function is executed first, followed by the `authorize` middleware function. This allows you to define a sequence of middleware functions to process requests in the desired order.

## Middleware Ordering

The order in which middleware is applied is crucial, as it determines the flow of execution. In `file-express-router`, middleware is executed in the order it is defined if multiple middleware functions are applied to a single file.

But, if you have multiple middleware files in the same directory, the order of execution is based on the file names. The middleware files are sorted alphabetically, and the middleware functions are executed in that order.
