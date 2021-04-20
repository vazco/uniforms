export function joinName(flag: null, ...parts: unknown[]): string[];
export function joinName(...parts: unknown[]): string;
export function joinName(...parts: unknown[]) {
  const name: string[] = [];
  for (let index = 0; index !== parts.length; ++index) {
    const part = parts[index];
    if (part || part === 0) {
      if (typeof part === 'string') {
        if (part.indexOf('.') !== -1) {
          name.push(...part.split('.'));
        } else {
          name.push(part);
        }
      } else if (Array.isArray(part)) {
        parts.splice(index--, 1, ...part);
      } else {
        name.push('' + part);
      }
    }
  }

  return parts[0] === null ? name : name.join('.');
}
