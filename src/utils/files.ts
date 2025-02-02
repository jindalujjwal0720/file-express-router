import fs from 'fs';
import path from 'path';
import { GLOBAL_OPTIONS } from './router';

export const ALLOWED_EXTENSIONS = ['.ts', '.js'];

export enum ALLOWED_EXTENSION {
  JS = '.js',
  TS = '.ts',
}

export interface File {
  type: 'file';
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The absolute path to the file.
   */
  path: string;
  /**
   * The extension of the file.
   */
  extension: ALLOWED_EXTENSION;
}

export interface Directory {
  type: 'directory';
  /**
   * The name of the directory.
   */
  name: string;
  /**
   * The absolute path to the directory.
   */
  children: Array<File | Directory>;
  /**
   * The absolute path to the directory.
   */
  path: string;
}

export type FileSystemEntry = File | Directory;

export const getFileName = (filePath: string): string => {
  return path.basename(filePath, path.extname(filePath));
};

export const generateFileStructure = (
  sourcePath: string,
  name?: string,
): FileSystemEntry[] => {
  const stats = fs.statSync(sourcePath);
  name = name ?? getFileName(sourcePath);

  if (stats.isFile()) {
    const ext = path.extname(sourcePath);
    if (
      !GLOBAL_OPTIONS.include?.includes(ext) ||
      !ALLOWED_EXTENSIONS.includes(ext)
    ) {
      return [];
    }
    return [
      {
        type: 'file',
        name,
        path: sourcePath,
        extension: ext as ALLOWED_EXTENSION,
      },
    ];
  }

  const children = fs.readdirSync(sourcePath);
  const entries: FileSystemEntry[] = [];

  for (const child of children) {
    const childPath = path.join(sourcePath, child);
    const childStats = fs.statSync(childPath);

    if (childStats.isFile()) {
      const ext = path.extname(childPath);
      if (
        !GLOBAL_OPTIONS.include?.includes(ext) ||
        !ALLOWED_EXTENSIONS.includes(ext)
      ) {
        continue;
      }

      entries.push({
        type: 'file',
        name: getFileName(child),
        path: childPath,
        extension: ext as ALLOWED_EXTENSION,
      });
    } else {
      entries.push({
        type: 'directory',
        name: getFileName(child),
        children: generateFileStructure(childPath, child),
        path: childPath,
      });
    }
  }

  return entries;
};
