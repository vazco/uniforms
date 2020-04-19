export function joinName(flag: null, ...parts: unknown[]): string[];
export function joinName(...parts: unknown[]): string;
export function joinName(...parts: unknown[]) {
  const name = parts.reduce(
    (parts: unknown[], part: unknown) =>
      part || part === 0
        ? parts.concat(typeof part === 'string' ? part.split('.') : part)
        : parts,
    [],
  );

  return parts[0] === null ? name.map(part => '' + part) : name.join('.');
}
