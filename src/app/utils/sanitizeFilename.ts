export function sanitizeFilename(filename: string): string {
    // Remove any character that is not alphanumeric, dash, underscore, or period.
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  }