const escapeMatch = /[.[\]]/;
const escapeRegex = /"/g;
/** @internal */
function escape(string: string) {
  return string === '' || escapeMatch.test(string)
    ? `["${string.replace(escapeRegex, '\\"')}"]`
    : string;
}

function escapeIfNeeded(string: string, index: number) {
  const escaped = escape(string);
  return escaped === string ? (index ? `.${string}` : string) : escaped;
}

const unescapeRegex = /\\"/g;
/** @internal */
function unescape(string: string) {
  return string.startsWith('["') && string.endsWith('"]')
    ? string.slice(2, -2).replace(unescapeRegex, '"')
    : string;
}

const nameRegex =
  /^([^.[\]]*(?:\.[^.[\]]+)*)(?:\.?(\["(?:[^"]|\\")*?(?<!\\)"])\.?(.*))?$/;
function joinName_(flag: null, ...parts: unknown[]): string[];
function joinName_(...parts: unknown[]): string;
function joinName_(...parts: unknown[]) {
  const name: string[] = [];
  for (let index = 0; index !== parts.length; ++index) {
    const part = parts[index];
    if (part || part === 0) {
      if (typeof part === 'string') {
        const match = nameRegex.exec(part);
        if (match) {
          const [, prefix, subscript, rest] = match;

          // `prefix` is a dotted name, e.g., `object.nested.2.field`.
          if (prefix) {
            if (prefix.includes('.')) {
              name.push(...prefix.split('.'));
            } else {
              name.push(prefix);
            }
          }

          // `subscript` is a `["..."]` subscript. The content within should be
          // escaped by the user, e.g., `["\\""]`.
          if (subscript !== undefined) {
            name.push(unescape(subscript));

            // `rest` is anything _after_ the subscript. If the first character
            // is a dot (`.`), then it's stripped (`.a` -> `a`).
            if (rest) {
              parts[index--] = rest;
            }
          }
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

  return parts[0] === null
    ? name.map(escape)
    : name.map(escapeIfNeeded).join('');
}

export const joinName = Object.assign(joinName_, { escape, unescape });
