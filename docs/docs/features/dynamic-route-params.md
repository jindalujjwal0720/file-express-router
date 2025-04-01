# Dynamic Route Parameters

Dynamic route parameters allow you to define flexible routes that can handle different inputs dynamically. This is useful when creating routes that depend on user-provided values, such as IDs or slugs.

## Single Parameters

A single dynamic parameter is represented using square brackets (`[]`). The value in the brackets acts as a placeholder and is replaced with actual data from the request.

```bash
routes/
├── users/
│   ├── [id].get.ts   →  GET /users/:id
└── products/
    ├── [slug].get.ts →  GET /products/:slug
    ├── [slug].post.ts →  POST /products/:slug
```

```ts title="routes/users/[id].get.ts"
export default (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
};
```

## Multiple Parameters

You can define multiple parameters within the same route using multiple bracketed values.

```bash
routes/
└── orders/
    ├── [userId]/[orderId].get.ts → GET /orders/:userId/:orderId
```

```ts title="routes/orders/[userId]/[orderId].ts"
export default (req, res) => {
  const { userId, orderId } = req.params;
  res.json({ userId, orderId });
};
```

### Summary

| Feature             | Syntax              | Example Route                | Example URL      |
| ------------------- | ------------------- | ---------------------------- | ---------------- |
| Single Parameter    | `[param]`           | `/users/[id]`                | `/users/123`     |
| Multiple Parameters | `[param1]/[param2]` | `/orders/[userId]/[orderId]` | `/orders/45/789` |

These dynamic routes enable flexible and scalable routing structures, making API development more streamlined.
