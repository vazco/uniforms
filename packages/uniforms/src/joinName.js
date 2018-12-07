// @flow

// FIXME: ESLint seems to have problems with this code.
/* eslint-disable no-redeclare, no-unused-vars */

declare function joinName(flag: null, ...parts: mixed[]): string[];
declare function joinName(...parts: mixed[]): string;

export default function joinName(...parts) {
  const name = parts.reduce(
    (parts, part) => (part || part === 0 ? parts.concat(typeof part === 'string' ? part.split('.') : part) : parts),
    []
  );

  return parts[0] === null ? name.map(part => part.toString()) : name.join('.');
}
