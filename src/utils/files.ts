import fs from 'fs';
import path from 'path';

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
    return [
      {
        type: 'file',
        name,
        path: sourcePath,
      },
    ];
  }

  const children = fs.readdirSync(sourcePath);
  const entries: FileSystemEntry[] = [];

  for (const child of children) {
    const childPath = path.join(sourcePath, child);
    const childStats = fs.statSync(childPath);

    if (childStats.isFile()) {
      entries.push({
        type: 'file',
        name: getFileName(child),
        path: childPath,
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
