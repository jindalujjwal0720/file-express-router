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
