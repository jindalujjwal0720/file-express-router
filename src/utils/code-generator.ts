import { FileSystemEntry, getRelativePath } from './files';
import { EndRoute, MiddlewareRoute, Route, RouteMethod } from './main';
import { logger } from './logs';
import { UniqueNameGenerator } from './name-generator';
import { PathUtils } from './path';
import { GLOBAL_OPTIONS } from './router';

// Code generation utilities
export class CodeGenerator {
  private nameGenerator: UniqueNameGenerator;

  constructor() {
    this.nameGenerator = new UniqueNameGenerator();
  }

  getNextHandlerName(): string {
    return this.nameGenerator.next();
  }

  getImportCode(name: string, file: string): string {
    // Remove file extension and convert backslashes to forward slashes
    file = file.replace(/\\/g, '/').replace(/\.[^.]+$/, '');
    return GLOBAL_OPTIONS.router?.require
      ? `const ${name} = require('./${file}');`
      : `import ${name} from './${file}';`;
  }

  getExportDefaultCode(name: string): string {
    return GLOBAL_OPTIONS.router?.require
      ? `module.exports = ${name};`
      : `export default ${name};`;
  }

  generateImportsCode(routes: Route[]): string {
    const imports = routes
      .map((route) => {
        if (route.type === 'end') {
          const relativePath = getRelativePath(route.file, GLOBAL_OPTIONS.dir);
          return this.getImportCode(route.handler, relativePath);
        } else {
          return this.generateImportsCode(route.children);
        }
      })
      .join('\n');

    return imports.replace(/\n{2,}/g, '\n\n');
  }

  generateExpressRouterCode(routerName: string, route: Route): string {
    if (route.type === 'end') {
      if (route.method === 'middleware' || route.method === 'error') {
        return '';
      }

      return `${routerName}.${route.method}('${route.name}', ${route.handler});`;
    } else {
      const subRouterInfo = `// ${getRelativePath(route.file, GLOBAL_OPTIONS.dir) || '(root)'}`;
      const subRouterName = this.nameGenerator.next();

      // Generate code for middlewares
      const preMiddlewaresCode = route.preMiddlewares
        .map((middleware) => `${subRouterName}.use(${middleware});`)
        .join('\n');

      const postMiddlewaresCode = route.postMiddlewares
        .map((middleware) => `${subRouterName}.use(${middleware});`)
        .join('\n');

      const subRouterCreationCode = `const ${subRouterName} = Router({ mergeParams: true });`;
      const subRouterCode = route.children
        .map((child) => this.generateExpressRouterCode(subRouterName, child))
        .filter(Boolean)
        .join('\n');
      const routerUseCode = `${routerName}.use('${route.name}', ${subRouterName});`;

      return [
        '',
        subRouterInfo,
        subRouterCreationCode,
        preMiddlewaresCode,
        subRouterCode,
        postMiddlewaresCode,
        routerUseCode,
        '',
      ].join('\n');
    }
  }

  async generateFileContent(entries: FileSystemEntry[]): Promise<string> {
    // Create base path route
    const baseRoute: MiddlewareRoute = {
      type: 'middleware',
      file: GLOBAL_OPTIONS.dir,
      name: '/',
      preMiddlewares: [],
      postMiddlewares: [],
      children: [],
    };

    // Generate routes
    const children = await this.generateRoutesRecursive(entries, baseRoute);
    baseRoute.children = children;

    // Generate code components
    const routerImportCode = GLOBAL_OPTIONS.router?.require
      ? `const { Router } = require('express');`
      : `import { Router } from 'express';`;
    const handlerImportsCode = this.generateImportsCode(baseRoute.children);
    const routerName = this.nameGenerator.next();
    const routerCreationCode = `const ${routerName} = Router({ mergeParams: true });`;
    const routerCode = this.generateExpressRouterCode(routerName, baseRoute);
    const exportCode = this.getExportDefaultCode(routerName);

    const info = `/**
 * This file was automatically generated by fer: file-express-router.
 * Generated on: ${Intl.DateTimeFormat('en-US', {
   dateStyle: 'full',
   timeStyle: 'long',
 }).format(Date.now())}
 * Do not modify it manually.
 */`;

    return [
      info,
      routerImportCode,
      handlerImportsCode,
      '',
      routerCreationCode,
      routerCode,
      '',
      exportCode,
      '',
    ]
      .join('\n')
      .replace(/\n{3,}/g, '\n\n');
  }

  async generateRoutesRecursive(
    entries: FileSystemEntry[],
    parent?: MiddlewareRoute,
  ): Promise<Route[]> {
    const routes: Route[] = [];
    try {
      for (const entry of entries) {
        if (entry.type === 'file') {
          const nameParts = entry.name.split('.');
          if (nameParts.length < 2) {
            logger.warn(
              `Skipping file with invalid name format: ${entry.name}`,
            );
            continue;
          }

          const handler = this.getNextHandlerName();
          const method = nameParts[1] as RouteMethod;

          if (method === 'middleware' || method === 'error') {
            if (!parent) {
              throw new Error(
                `Cannot use ${method} handler without a parent directory`,
              );
            }

            if (method === 'middleware') {
              parent.preMiddlewares.push(handler);
            } else {
              parent.postMiddlewares.push(handler);
            }
          }

          const name = PathUtils.getPathName('/' + entry.name);
          const route: EndRoute = {
            type: 'end',
            file: entry.path,
            name: name === '/index' ? '/' : name,
            handler,
            method,
          };
          routes.push(route);
        } else {
          const name = PathUtils.getPathName('/' + entry.name);
          const middleware: MiddlewareRoute = {
            type: 'middleware',
            file: entry.path,
            name: name === '/index' ? '/' : name,
            preMiddlewares: [],
            postMiddlewares: [],
            children: [],
          };

          const children = await this.generateRoutesRecursive(
            entry.children,
            middleware,
          );

          middleware.children = children;
          routes.push(middleware);
        }
      }
    } catch (error) {
      logger.error('Error generating routes:', error);
      throw new Error(
        `Failed to generate routes: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return routes;
  }
}
