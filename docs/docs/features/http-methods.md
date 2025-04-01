# HTTP Method Handlers

In `file-express-router`, HTTP method handlers allow you to define how your routes should respond to various HTTP requests like `GET`, `POST`, `PUT`, `DELETE`, etc. Each route file can have one or more handlers that correspond to the HTTP methods supported for that route. This approach simplifies route handling by providing a clear structure for each type of request.

## Defining HTTP Method Handlers

In each route file, you define a `handler` function for each HTTP method you want to support. This handler function is of the `RequestHandler` type, which is provided by the `express` library.

```ts title="routes/products/featured.get.ts"
export default (req, res) => {
  res.json({ featured: [] });
};
```

```ts title="routes/products/featured.post.ts"
export default (req, res) => {
  res.status(405).send('Method Not Allowed');
};
```

In the above example, the `GET /products/featured` route returns a list of featured products, while the `POST` method responds with a "Method Not Allowed" status.

## Supported HTTP Methods

You can define handlers for the following HTTP methods:

- **GET** (.get)
- **POST** (.post)
- **PUT** (.put)
- **DELETE** (.delete)
- **PATCH** (.patch)
- **HEAD** (.head)
- **OPTIONS** (.options)
- **Pre Middleware** (.middleware)
- **Post Middleware** (.error)

Each file handler corresponds to a specific HTTP request type, which helps to keep the logic for each type of operation well-defined and separate.

## Handling Multiple Methods

You can handle multiple methods by creating separate files for each method in the same route directory. The library will automatically load the appropriate handler based on the incoming request method.

```ts title="routes/products/[id].get.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ id });
};
```

```ts title="routes/products/[id].put.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ updatedId: id });
};
```

```ts title="routes/products/[id].delete.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ deletedId: id });
};
```

In this example, the `GET`, `PUT`, and `DELETE` handlers for `/products/:id` allow you to fetch, update, and delete product information.

## Dynamic Route Handling

For routes with dynamic parameters, you can use HTTP method handlers in conjunction with route parameters. The parameters are automatically parsed by the library and passed to the route handler via `req.params`.

```ts title="routes/users/[id].get.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ user: id });
};
```

```ts title="routes/users/[id].put.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ updatedUser: id });
};
```

Here, the `GET` and `PUT` methods for `/users/:id` allow retrieving and updating user data based on the dynamic `id` parameter.

## Returning Responses

The HTTP method handlers can send responses in various formats, including JSON, HTML, plain text, and more. You can use the `res` object to set the response status, headers, and body as needed.

```ts title="routes/health.get.ts"
export default (req, res) => {
  res.status(200).json({ status: 'OK' });
};
```

In the above example, the `GET /health` route returns a JSON response with a status of "OK".
