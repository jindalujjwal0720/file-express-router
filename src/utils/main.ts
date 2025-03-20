import path from 'path';
import { Router as ExpressRouter } from 'express';
import { FileSystemEntry, writeFile } from './files';
import { GLOBAL_OPTIONS } from './router';
import { logger } from './logs';
import { CodeGenerator } from './code-generator';

// Type definitions
export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'head'
  | 'patch'
  | 'options';
type MiddlewareType = 'middleware' | 'error';
export type RouteMethod = HttpMethod | MiddlewareType;

interface BaseRoute {
  file: string;
  name: string;
}

export interface EndRoute extends BaseRoute {
  type: 'end';
  handler: string;
  method: RouteMethod;
}

export interface MiddlewareRoute extends BaseRoute {
  type: 'middleware';
  preMiddlewares: string[];
  postMiddlewares: string[];
  children: Route[];
}

export type Route = EndRoute | MiddlewareRoute;

/**
 * Generate Express router from file system entries
 * @param entries File system entries
 * @returns Express router instance
 */
export const generateRouter = async (
  entries: FileSystemEntry[],
): Promise<ExpressRouter> => {
  try {
    const codeGenerator = new CodeGenerator();
    const code = await codeGenerator.generateFileContent(entries);

    const routerFileExtension = GLOBAL_OPTIONS.router?.ts ? '.ts' : '.js';
    const routerPath = path.join(
      GLOBAL_OPTIONS.dir,
      'index' + routerFileExtension,
    );

    await writeFile(routerPath, code);

    try {
      const { default: ferRouter } = await import(routerPath);
      return ferRouter;
    } catch (importError) {
      logger.error('Error importing generated router:', importError);
      throw new Error(
        `Failed to import generated router: ${importError instanceof Error ? importError.message : String(importError)}`,
      );
    }
  } catch (error) {
    logger.error('Error in router generation:', error);
    throw new Error(
      `Router generation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
