import path from 'path';
import { ALLOWED_EXTENSION, FileSystemEntry } from '../files';
import { logger } from '../logs';
import { generateRouter } from '../main';
import type { MiddlewareRoute, EndRoute } from '../main';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UniqueNameGenerator } from '../name-generator';
import { PathUtils } from '../path';
import { CodeGenerator } from '../code-generator';

// Mock the express Router
jest.mock('express', () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    head: jest.fn(),
    options: jest.fn()
  })),
}));

// Mock the file system utilities
jest.mock('../files', () => ({
  getRelativePath: jest.fn((file: string, dir: string) => file.replace(dir, '').replace(/^\//, '')),
  writeFile: jest.fn(() => Promise.resolve(undefined)),
  ALLOWED_EXTENSION: ['.js', '.ts']
}));

// Mock the router options
jest.mock('../router', () => {
  const originalModule = jest.requireActual('../router');
  return {
    ...(typeof originalModule === 'object' && originalModule !== null ? originalModule : {}),
    GLOBAL_OPTIONS: {
      dir: path.resolve(__dirname, 'fixtures'),
      router: {
        ts: true,
        require: false
      }
    }
  };
});

describe('UniqueNameGenerator', () => {
  it('should generate unique names in expected sequence', () => {
    const generator = new UniqueNameGenerator();
    expect(generator.next()).toBe('a');
    expect(generator.next()).toBe('b');
    expect(generator.next()).toBe('c');
    
    // Generate many names to test rollover
    for (let i = 0; i < 50; i++) {
      generator.next();
    }
    
    expect(generator.next()).toBe('ab');
  });
});

describe('PathUtils', () => {
  describe('removeExtension', () => {
    it('should remove file extension', () => {
      expect(PathUtils.removeExtension('file.js')).toBe('file');
      expect(PathUtils.removeExtension('path/to/file.ts')).toBe('path/to/file');
      expect(PathUtils.removeExtension('no-extension')).toBe('no-extension');
    });
  });
  
  describe('getPathName', () => {
    it('should convert dynamic segments to express params', () => {
      expect(PathUtils.getPathName('/users/[id]')).toBe('/users/:id');
    });
    
    it('should handle index route as root', () => {
      expect(PathUtils.getPathName('/index')).toBe('/');
    });
    
    it('should normalize paths', () => {
      expect(PathUtils.getPathName('/users//profile/')).toBe('/users/profile');
    });
    
    it('should handle nested dynamic segments', () => {
      expect(PathUtils.getPathName('/users/[userId]/posts/[postId]')).toBe('/users/:userId/posts/:postId');
    });
  });
});

describe('CodeGenerator', () => {
  let codeGenerator: CodeGenerator;
  
  beforeEach(() => {
    codeGenerator = new CodeGenerator();
    jest.clearAllMocks();
  });
  
  describe('getImportCode', () => {
    it('should generate ES module import statement', () => {
      const result = codeGenerator.getImportCode('userHandler', 'users/get');
      expect(result).toBe("import { handler as userHandler } from './users/get';");
    });
    
    it('should normalize file paths', () => {
      const result = codeGenerator.getImportCode('userHandler', 'users\\get.js');
      expect(result).toBe("import { handler as userHandler } from './users/get';");
    });
  });
  
  describe('getExportDefaultCode', () => {
    it('should generate default export statement', () => {
      const result = codeGenerator.getExportDefaultCode('mainRouter');
      expect(result).toBe('export default mainRouter;');
    });
  });
  
  describe('generateRoutesRecursive', () => {
    it('should generate routes for files', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'users.get.js',
          path: '/test/dir/users.get.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      const parent: MiddlewareRoute = {
        type: 'middleware',
        file: '/test/dir/users',
        name: '/users',
        preMiddlewares: [],
        postMiddlewares: [],
        children: []
      };
      
      const routes = await codeGenerator.generateRoutesRecursive(entries, parent);
      
      expect(routes).toHaveLength(1);
      expect(routes[0]).toMatchObject({
        type: 'end',
        name: '/users',
        method: 'get'
      });
    });
    
    it('should handle middleware files', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'auth.middleware.js',
          path: '/test/dir/auth.middleware.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      const parent: MiddlewareRoute = {
        type: 'middleware',
        file: '/test/dir/users',
        name: '/users',
        preMiddlewares: [],
        postMiddlewares: [],
        children: []
      };
      
      await codeGenerator.generateRoutesRecursive(entries, parent);
      
      expect(parent.preMiddlewares).toHaveLength(1);
    });
    
    it('should handle error middleware files', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'error.error.js',
          path: '/test/dir/error.error.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      const parent: MiddlewareRoute = {
        type: 'middleware',
        file: '/test/dir/users',
        name: '/users',
        preMiddlewares: [],
        postMiddlewares: [],
        children: []
      };
      
      await codeGenerator.generateRoutesRecursive(entries, parent);
      
      expect(parent.postMiddlewares).toHaveLength(1);
    });
    
    it('should throw error when middleware has no parent', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'auth.middleware.js',
          path: '/test/dir/auth.middleware.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      await expect(codeGenerator.generateRoutesRecursive(entries)).rejects.toThrow(
        'Cannot use middleware handler without a parent directory'
      );
    });
    
    it('should handle nested directory structure', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'users',
          path: '/test/dir/users',
          type: 'directory',
          children: [
            {
              name: 'index.get.js',
              path: '/test/dir/users/index.get.js',
              type: 'file',
              extension: ALLOWED_EXTENSION.JS
            },
            {
              name: '[id]',
              path: '/test/dir/users/[id]',
              type: 'directory',
              children: [
                {
                  name: 'profile.get.js',
                  path: '/test/dir/users/[id]/profile.get.js',
                  type: 'file',
                  extension: ALLOWED_EXTENSION.JS
                }
              ]
            }
          ]
        }
      ];
      
      const routes = await codeGenerator.generateRoutesRecursive(entries);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].type).toBe('middleware');
      
      const userRoute = routes[0] as MiddlewareRoute;
      expect(userRoute.name).toBe('/users');
      expect(userRoute.children).toHaveLength(2);
      
      // Check the dynamic parameter route
      const paramRoute = userRoute.children?.find((r) => r.type === 'middleware');
      expect(paramRoute?.name).toBe('/:id');
    });
    
    it('should handle invalid file names gracefully', async () => {
      // Mock console.warn to check warning messages
      const consoleWarnMock = jest.spyOn(logger, 'warn').mockImplementation(() => {});
      
      const entries: FileSystemEntry[] = [
        {
          name: 'invalid-file-no-method',
          path: '/test/dir/invalid-file-no-method',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      const routes = await codeGenerator.generateRoutesRecursive(entries);
      
      expect(routes).toHaveLength(0);
      expect(consoleWarnMock).toHaveBeenCalledWith(
        expect.stringContaining('Skipping file with invalid name format')
      );
      
      consoleWarnMock.mockRestore();
    });
  });
  
  describe('generateFileContent', () => {
    it('should generate complete router file content', async () => {
      const entries: FileSystemEntry[] = [
        {
          name: 'users.get.js',
          path: '/test/dir/users.get.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        },
        {
          name: 'auth.middleware.js',
          path: '/test/dir/auth.middleware.js',
          type: 'file',
          extension: ALLOWED_EXTENSION.JS
        }
      ];
      
      const fileContent = await codeGenerator.generateFileContent(entries);
      
      // Check essential parts of the generated content
      expect(fileContent).toContain('import { Router } from \'express\';');
      expect(fileContent).toContain('This file was automatically generated');
      expect(fileContent).toContain('export default');
      expect(fileContent).toContain('.get(\'/users\'');
    });
  });
  
  describe('generateExpressRouterCode', () => {
    it('should generate code for end routes', () => {
      const endRoute: EndRoute = {
        type: 'end',
        file: '/test/dir/users.get.js',
        name: '/users',
        handler: 'userHandler',
        method: 'get'
      };
      
      const code = codeGenerator.generateExpressRouterCode('router', endRoute);
      
      expect(code).toBe('router.get(\'/users\', userHandler);');
    });
    
    it('should generate code for middleware routes', () => {
      const middlewareRoute: MiddlewareRoute = {
        type: 'middleware',
        file: '/test/dir/users',
        name: '/users',
        preMiddlewares: ['authMiddleware'],
        postMiddlewares: ['errorHandler'],
        children: [
          {
            type: 'end',
            file: '/test/dir/users/index.get.js',
            name: '/',
            handler: 'indexHandler',
            method: 'get'
          }
        ]
      };
      
      const code = codeGenerator.generateExpressRouterCode('router', middlewareRoute);
      
      expect(code).toContain('router.use(\'/users\'');
      expect(code).toContain('router.use(authMiddleware);');
      expect(code).toContain('router.use(errorHandler);');
    });
    
    it('should skip middleware method in end routes', () => {
      const endRoute: EndRoute = {
        type: 'end',
        file: '/test/dir/auth.middleware.js',
        name: '/auth',
        handler: 'authMiddleware',
        method: 'middleware'
      };
      
      const code = codeGenerator.generateExpressRouterCode('router', endRoute);
      
      expect(code).toBe('');
    });
  });
});

describe('generateRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the import of the generated router
    jest.mock(path.resolve(__dirname, 'fixtures', 'index.ts'), () => ('mocked-router'
    ), { virtual: true });
  });
  
  it('should generate router file and return router instance', async () => {
    const entries: FileSystemEntry[] = [
      {
        name: 'users.get.js',
        path: '/test/dir/users.get.js',
        type: 'file',
        extension: ALLOWED_EXTENSION.JS
      }
    ];
    
    // Use import instead of require
    const { writeFile } = await import('../files');
    
    const router = await generateRouter(entries);
    
    expect(writeFile).toHaveBeenCalledWith(
      path.resolve(__dirname, 'fixtures', 'index.ts'),
      expect.any(String)
    );
    expect(router).toBe('mocked-router');
  });
  
  it('should throw error when router generation fails', async () => {
    const entries: FileSystemEntry[] = [
      {
        name: 'users.get.js',
        path: '/test/dir/users.get.js',
        type: 'file',
        extension: ALLOWED_EXTENSION.JS
      }
    ];
    
    // Use import instead of require
    const { writeFile } = await import('../files');
    (writeFile as jest.MockedFunction<typeof writeFile>).mockRejectedValueOnce(new Error('File write error'));
    
    await expect(generateRouter(entries)).rejects.toThrow('Router generation failed');
  });
});