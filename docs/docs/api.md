# API Reference

## Router

The **Router** function is the main entry point for the library. It initializes the router with the provided configuration and automatically loads and registers routes from the specified directory.

- **Type**: `function`
- **Description**: Initializes the router with the provided configuration. It automatically loads and registers routes from the specified directory.
- **Parameters**:
  - `options` (object)
    - `dir` (string) **Required**: The root directory where route files are located.
    - `logger` (boolean) **Optional**: A flag to enable or disable logging. Default is `true`.
    - `include` (string[]) **Optional**: An array of file extensions to include when searching for route files. Default is `['.js', '.ts']`.
    - `router` (object) **Optional**: Router file generation options.
      - `require` (string) **Optional**: Whether to use `require` or `import` for route files. Default is `import`.
      - `ts` (boolean) **Optional**: Whether to generate TypeScript or JavaScript route files. Default is `true`.

## Configuration Options

The **Router** function accepts an object with the following configuration options:

### dir

- **Required**: Yes
- **Type**: `string`
- **Description**: The root directory where your route files are located. This is where the router will search for route files to register automatically.

### logger

- **Required**: No
- **Type**: `boolean`
- **Default**: `true`
- **Description**: A flag to enable or disable logging. When set to `true`, the router will log information about registered routes and middleware.

### include

- **Required**: No
- **Type**: `string[]`
- **Default**: `['.js', '.ts']`
- **Description**: An array of file extensions to include when searching for route files. By default, the router will only include `.js` and `.ts` files.
- **Allowed Values**: `['.js', '.ts']`

### router

- **Required**: No
- **Type**: `object`
- **Description**: Router file generation options.

  #### require

  - **Type**: `string`
  - **Default**: `import`
  - **Description**: Whether to use `require` or `import` for route files. When set to `import`, the router will use ES modules for importing route files.

  #### ts

  - **Type**: `boolean`
  - **Default**: `true`
  - **Description**: Whether to generate TypeScript or JavaScript route files. When set to `true`, the router will generate TypeScript route files.

## Example

```typescript
import { Router } from 'file-express-router';

const startServer = async () => {
  const app = express();

  const routesDir = path.join(__dirname, 'routes');
  const router = await Router({
    // Required: The root directory where route files are located
    dir: routesDir,
    // Optional: Enable or disable logging
    logger: true,
    // Optional: An array of file extensions to include
    include: ['.js', '.ts'],
    // Optional: Router file generation options
    router: {
      // Optional: Whether to use `require` or `import` for route files
      require: 'import',
      // Optional: Whether to generate TypeScript or JavaScript route files
      ts: true,
    },
  });

  app.use('/api', router);

  app.listen(6969, () => {
    console.log('Server is running on http://localhost:6969');
  });
};
```
