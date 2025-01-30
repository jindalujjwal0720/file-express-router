# Middleware Management

Middleware in `file-express-router` allows you to handle requests and responses by adding layers of logic between the client and your route handlers. You can apply middleware at the directory or file level, giving you flexibility and control over how you manage requests. Additionally, error handling is streamlined with built-in support for error middleware, and the order in which middleware is applied can be controlled.

## Directory-Level Middleware

You can apply middleware to all routes within a specific directory by placing a `_middleware.ts` file in that directory. This is ideal for scenarios like user authentication or logging, where the same middleware logic should be applied to multiple routes.

Example:

```ts title="routes/users/_middleware.ts"
export const handler = (req, res, next) => {
  console.log('Middleware applied to all user routes');
  next();
};
```

## File-Level Middleware

File-level middleware applies only to the specific route file in which it’s defined. This gives you fine-grained control over which routes should use specific middleware, making it easy to customize behavior for individual routes.

Example:

```ts title="routes/users/[id].ts"
export const middleware = (req, res, next) => {
  console.log('Middleware applied to the user ID route');
  next();
};
```

**Note:** File-level middleware is defined in the route file itself, not in a separate `_middleware.ts` file.

## Error Middleware

Error middleware allows you to handle any errors that arise during the request lifecycle. By defining error-handling middleware, you can centralize error logic and keep your route handlers focused on business logic.

Example:

```ts title="routes/_error.ts"
export const handler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
};
```

**Note:** Error middleware is defined in a `_error.ts` file and is executed when an error is passed to the `next()` function. If the error is normally thrown, it will not be caught by the error middleware. Error middleware only runs when `next(err)` is called within a route or another middleware.

## Middleware Ordering

The order in which middleware is applied is crucial, as it determines the flow of execution. In `file-express-router`, middleware is executed in the order it is defined. Make sure to define middleware in the correct sequence to avoid unexpected behavior.

- **Directory-level middleware** is applied first, followed by **file-level middleware**.
- Error middleware is executed last, after all route handlers and other middleware have been processed.

Proper ordering ensures that requests are processed in the desired sequence, and errors are handled appropriately.
