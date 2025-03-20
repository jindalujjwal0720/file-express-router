import fs from 'fs/promises';
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

export const getRelativePath = (filePath: string, root: string): string => {
  return path.relative(root, filePath).replace(/\\/g, '/');
};

export const writeFile = async (
  filePath: string,
  data: string,
): Promise<void> => {
  const tempPath = path + '.temp';
  await fs
    .mkdir(path.dirname(tempPath), { recursive: true })
    .catch((err) => console.error(err));
  await fs.writeFile(tempPath, data).catch((err) => console.error(err));
  await fs.rename(tempPath, filePath).catch((err) => console.error(err));
};

const ignoreFile = (name: string, ext: string) => {
  return (
    // Ignore files that are not allowed
    !GLOBAL_OPTIONS.include?.includes(ext) ||
    !ALLOWED_EXTENSIONS.includes(ext) ||
    // Ignore files that start with _fer
    name.startsWith('_fer') ||
    // Ignore files that don't follow the pattern [anything].method.ext
    !name.match(/^.+\..+\..+$/)
  );
};

export const generateFolderStructure = async (
  sourcePath: string,
): Promise<FileSystemEntry[]> => {
  const children = await fs.readdir(sourcePath);
  const entries: FileSystemEntry[] = [];

  for (const child of children) {
    const childPath = path.join(sourcePath, child);
    const childStats = await fs.stat(childPath);

    if (childStats.isFile()) {
      const ext = path.extname(childPath);
      if (ignoreFile(child, ext)) {
        continue;
      }

      entries.push({
        type: 'file',
        name: getFileName(child),
        path: childPath,
        extension: ext as ALLOWED_EXTENSION,
      });
    } else {
      const childrenStructure = await generateFolderStructure(childPath);
      entries.push({
        type: 'directory',
        name: getFileName(child),
        children: childrenStructure,
        path: childPath,
      });
    }
  }

  return entries;
};
