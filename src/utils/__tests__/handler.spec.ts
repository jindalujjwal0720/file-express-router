import { Router } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { FileSystemEntry } from '../files';
import {
  getGenericHandler,
  isParameter,
  registerRoute,
  registerRoutes,
} from '../handler';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('express', () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe('getGenericHandler', () => {
  it('should return undefined when source is empty', async () => {
    const handler = await getGenericHandler('');
    expect(handler).toBeUndefined();
  });

  it('should return handler when module exports it', async () => {
    // Create a mock module that exports a handler
    jest.mock('./fixtures/handler-exists', () => ({
      handler: jest.fn(),
    }));
    const absPath = require.resolve('./fixtures/handler-exists');
    const handler = await getGenericHandler(absPath);
    expect(handler).toBeDefined();
  });

  it('should return undefined when module has no handler', async () => {
    jest.mock('./fixtures/handler-missing', () => ({
      notHandler: jest.fn(),
    }));
    const absPath = require.resolve('./fixtures/handler-missing');
    const handler = await getGenericHandler(absPath);
    expect(handler).toBeUndefined();
  });
});

describe('isParameter', () => {
  it('should detect parameter segments', () => {
    const [isParam, name] = isParameter('[id]');
    expect(isParam).toBe(true);
    expect(name).toBe('id');
  });

  it('should return false for non-parameter segments', () => {
    const [isParam, name] = isParameter('users');
    expect(isParam).toBe(false);
    expect(name).toBe('users');
  });

  it('should handle invalid parameter formats', () => {
    const [isParam, name] = isParameter('[[id]]');
    expect(isParam).toBe(false);
    expect(name).toBe('[[id]]');
  });
});

describe('registerRoute', () => {
  let router: Router;

  beforeEach(() => {
    router = Router() as jest.Mocked<Router>;
    jest.clearAllMocks();
  });

  it('should skip reserved file names', async () => {
    const entry: FileSystemEntry = {
      name: '_middleware',
      path: require.resolve('./fixtures/_middleware'),
      type: 'file',
    };
    await registerRoute(router, entry);
    expect(router.use).not.toHaveBeenCalled();
  });

  it('should register directory as nested router', async () => {
    const childEntry: FileSystemEntry = {
      name: 'index',
      path: require.resolve('./fixtures/dir/index'),
      type: 'file',
    };
    const entry: FileSystemEntry = {
      name: 'users',
      path: require.resolve('./fixtures/dir'),
      type: 'directory',
      children: [childEntry],
    };
    await registerRoute(router, entry);
    expect(Router).toHaveBeenCalledWith({ mergeParams: true });
    expect(router.use).toHaveBeenCalledWith('/users', {
      use: expect.any(Function),
      get: expect.any(Function),
      post: expect.any(Function),
      put: expect.any(Function),
      patch: expect.any(Function),
      delete: expect.any(Function),
    });
  }); 

  it('should register file with HTTP methods', async () => {
    const mockGetHandler = jest.fn();
    jest.mock('./fixtures/user-get', () => ({
      get: mockGetHandler,
    }));
    const entry: FileSystemEntry = {
      name: 'users',
      path: require.resolve('./fixtures/user-get'),
      type: 'file',
    };
    await registerRoute(router, entry);
    expect(router.get).toHaveBeenCalledWith('/users', mockGetHandler);
  });

  it('should convert index to root route', async () => {
    const mockGetHandler = jest.fn();
    jest.mock('./fixtures/index', () => ({
      get: mockGetHandler,
    }));
    const entry: FileSystemEntry = {
      name: 'index',
      path: require.resolve('./fixtures/index'),
      type: 'file',
    };
    await registerRoute(router, entry);
    expect(router.get).toHaveBeenCalledWith('/', mockGetHandler);
  });

  it('should apply middlewares in correct order', async () => {
    const preMiddleware = jest.fn() as jest.MockedFunction<RequestHandler>;
    const postMiddleware = jest.fn() as jest.MockedFunction<RequestHandler>;
    const entry: FileSystemEntry = {
      name: 'users',
      path: require.resolve('./fixtures/user-middleware'),
      type: 'file',
    };
    jest.mock('./fixtures/user-middleware', () => ({
      middleware: jest.fn(),
    }));
    await registerRoute(router, entry, preMiddleware, postMiddleware);
    expect(router.use).toHaveBeenNthCalledWith(1, preMiddleware);
    expect(router.use).toHaveBeenNthCalledWith(2, expect.any(Function)); // file's middleware
    expect(router.use).toHaveBeenLastCalledWith(postMiddleware);
  });
});

describe('registerRoutes', () => {
  let router: Router;
  const mockMiddleware = jest.fn();
  const mockErrorMiddleware = jest.fn();

  beforeEach(() => {
    router = Router() as jest.Mocked<Router>;
    jest.clearAllMocks();
  });

  it('should register middleware from _middleware file', async () => {
    const entries: FileSystemEntry[] = [
      {
        name: '_middleware',
        path: require.resolve('./fixtures/middleware-exists'),
        type: 'file',
      },
      {
        name: 'users',
        path: require.resolve('./fixtures/user-get'),
        type: 'file',
      },
    ];
    jest.mock('./fixtures/middleware-exists', () => ({
      handler: mockMiddleware,
    }));
    await registerRoutes(router, entries);
    expect(router.use).toHaveBeenCalledWith(mockMiddleware);
  });

  it('should register error middleware last', async () => {
    const entries: FileSystemEntry[] = [
      {
        name: '_error',
        path: require.resolve('./fixtures/error-middleware'),
        type: 'file',
      },
      {
        name: 'users',
        path: require.resolve('./fixtures/user-get'),
        type: 'file',
      },
    ];
    jest.mock('./fixtures/error-middleware', () => ({
      handler: mockErrorMiddleware,
    }));
    await registerRoutes(router, entries);
    expect(router.use).toHaveBeenLastCalledWith(mockErrorMiddleware);
  });

  it('should skip reserved files when registering routes', async () => {
    const entries: FileSystemEntry[] = [
      {
        name: '_middleware',
        path: require.resolve('./fixtures/_middleware'),
        type: 'file',
      },
      {
        name: 'users',
        path: require.resolve('./fixtures/user-get'),
        type: 'file',
      },
    ];
    await registerRoutes(router, entries);
    expect(router.get).not.toHaveBeenCalledWith('_middleware');
  });

  it('should apply pre and post middlewares correctly', async () => {
    const preMiddleware = jest.fn() as unknown as RequestHandler;
    const postMiddleware = jest.fn() as unknown as RequestHandler;
    const entries: FileSystemEntry[] = [
      {
        name: 'users',
        path: require.resolve('./fixtures/user-get'),
        type: 'file',
      },
    ];
    await registerRoutes(router, entries, preMiddleware, postMiddleware);
    expect(router.use).toHaveBeenNthCalledWith(1, preMiddleware);
    expect(router.use).toHaveBeenLastCalledWith(postMiddleware);
  });
});