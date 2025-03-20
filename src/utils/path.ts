// Path utilities
export class PathUtils {
  static removeExtension(name: string): string {
    return name.replace(/\.[^.]+$/, '');
  }

  static getPathName(routePath: string): string {
    const sanitized =
      routePath
        // Convert dynamic segments [name] to :name
        .replace(/\[([^\]]+)\]/g, ':$1')
        // Remove special filenames like index
        .replace(/\/index$/, '')
        // Ensure no duplicate slashes
        .replace(/\/+/g, '/')
        // Remove trailing slash
        .replace(/\/$/, '') || '/';

    const removedExtension = this.removeExtension(sanitized);
    const removedMethod = this.removeExtension(removedExtension);
    return removedMethod;
  }
}
