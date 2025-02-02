# HTTP Method Handlers

In `file-express-router`, HTTP method handlers allow you to define how your routes should respond to various HTTP requests like `GET`, `POST`, `PUT`, `DELETE`, etc. Each route file can have one or more handlers that correspond to the HTTP methods supported for that route. This approach simplifies route handling by providing a clear structure for each type of request.

## Defining HTTP Method Handlers

In each route file, you can define methods such as `get`, `post`, `put`, and `delete` to handle requests for the corresponding HTTP methods. The handler functions receive the same parameters as in standard Express.js route handlers: `req`, `res`, and `next`.

```ts title="routes/products/featured.ts"
export const get = (req, res) => {
  res.json({ featured: [] });
};

export const post = (req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' });
};
```

In the above example, the `GET /products/featured` route returns a list of featured products, while the `POST` method responds with a "Method Not Allowed" status.

## Supported HTTP Methods

You can define handlers for the following HTTP methods:

- **GET**
- **POST**
- **PUT**
- **DELETE** (use `del` as an alias as `delete` is a reserved keyword)
- **PATCH**

Each handler corresponds to a specific HTTP request type, which helps to keep the logic for each type of operation well-defined and separate.

## Handling Multiple Methods

You can handle multiple methods in the same file by exporting handlers for different HTTP methods. This is useful when you want to manage multiple actions for a specific resource.

```ts title="routes/products/[id].ts"
export const get = (req, res) => {
  const { id } = req.params;
  res.json({ id });
};

export const put = (req, res) => {
  const { id } = req.params;
  res.json({ updated: true, id });
};

// Alias for DELETE method
export const del = (req, res) => {
  const { id } = req.params;
  res.json({ deleted: true, id });
};
```

In this example, the `GET`, `PUT`, and `DELETE` handlers for `/products/:id` allow you to fetch, update, and delete product information.

## Dynamic Route Handling

For routes with dynamic parameters, you can use HTTP method handlers in conjunction with route parameters. The parameters are automatically parsed by the library and passed to the route handler via `req.params`.

```ts title="routes/users/[id].ts"
export const get = (req, res) => {
  const { id } = req.params;
  res.json({ user: id });
};

export const put = (req, res) => {
  const { id } = req.params;
  res.json({ updatedUser: id });
};
```

Here, the `GET` and `PUT` methods for `/users/:id` allow retrieving and updating user data based on the dynamic `id` parameter.

## Returning Responses

The HTTP method handlers can send responses in various formats, including JSON, HTML, plain text, and more. You can use the `res` object to set the response status, headers, and body as needed.

```ts title="routes/health.ts"
export const get = (req, res) => {
  res.status(200).json({ status: 'OK' });
};
```

In the above example, the `GET /health` route returns a JSON response with a status of "OK".
