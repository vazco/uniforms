const escapeMatch = /[.[\]]/;
const escapeRegex = /"/g;

/** @internal */
function escape(string: string) {
  return string === '' || escapeMatch.test(string)
    ? `["${string.replace(escapeRegex, '\\"')}"]`
    : string;
}

/** @internal */
function escapeToJoin(string: string, index: number) {
  const escaped = escape(string);
  return escaped === string ? (index ? `.${string}` : string) : escaped;
}

const unescapeMatch = /^\["(.*)"]$/;
const unescapeRegex = /\\"/g;

/** @internal */
function unescape(string: string) {
  const match = unescapeMatch.exec(string);
  return match ? match[1].replace(unescapeRegex, '"') : string;
}

// This regular expression splits the string into three parts:
//   `prefix` is a dotted name, e.g., `object.nested.2.field` at the
//            front (hence prefix). It covers most standard usecases.
//   `subscript` is a `["..."]` subscript after the prefix. The content
//               within should be escaped by the user, e.g., `["\\""]`.
//   `rest` is anything following the subscript. The leading dot (`.`)
//          is stripped (`.a` -> `a`) if there is one. It is empty if
//          `subscript` is empty.
//
// All three parts can be empty!
const nameRegex =
  /^([^.[\]]*(?:\.[^.[\]]+)*)(?:\.?(\["(?:(?:[^"]|\\")*?[^\\])?"])\.?(.*))?$/;

// We cannot use `joinName` as we export a function with assigned internal
// helpers and the symbol has to stay free until then.
function joinNameImpl(flag: null, ...parts: unknown[]): string[];
function joinNameImpl(...parts: unknown[]): string;

// eslint-disable-next-line complexity -- The complexity of it _is_ high.
function joinNameImpl(...parts: unknown[]) {
  // If the first argument is `null`, then we return an escaped array of parts.
  // Otherwise, an escaped string is returned. As we may modify `parts` later,
  // this has to be checked now.
  const returnAsParts = parts[0] === null;

  // Result parts (not escaped).
  const name: string[] = [];

  // This cannot be transformed into a `.forEach` loop and the length of it
  // can not be memoized, as we modify `parts` as we go for performance reasons.
  for (let index = 0; index !== parts.length; ++index) {
    const part = parts[index];

    // All falsy values except `0` are ignored.
    if (part || part === 0) {
      if (typeof part === 'string') {
        // Strings are matched against the regular expression that split it into
        // three parts (all can be empty):
        //   `prefix` is a dotted name, e.g., `object.nested.2.field` at the
        //            front (hence prefix). It covers most standard usecases.
        //   `subscript` is a `["..."]` subscript after the prefix. The content
        //               within should be escaped by the user, e.g., `["\\""]`.
        //   `rest` is anything following the subscript. The leading dot (`.`)
        //          is stripped (`.a` -> `a`) if there is one. It is empty if
        //          `subscript` is empty.
        const match = nameRegex.exec(part);
        if (match) {
          const [, prefix, subscript, rest] = match;

          if (prefix) {
            // We could always `.split` the `prefix`, but it results in a severe
            // performance hit.
            if (prefix.includes('.')) {
              name.push(...prefix.split('.'));
            } else {
              name.push(prefix);
            }
          }

          if (subscript) {
            // We could adjust the `nameRegex` to skip brackets and `unescape`
            // to skip this check, but then every other call (e.g., a one in the
            // bridge) would have to know that. The performance is not affected
            // much by it anyway.
            name.push(unescape(subscript));

            // The `rest` is inlined in place as it is a single string.
            if (rest) {
              parts[index--] = rest;
            }
          }
        } else {
          // If a string is not matching the pattern, we leave it as it is. We
          // may want to raise a warning here as it should not happen. Most
          // likely it is something that should have been escaped (e.g., `[`).
          name.push(part);
        }
      } else if (Array.isArray(part)) {
        // Arrays are flattened in place but only if needed, i.e., they are not
        // empty. We calculate the length of the overlapping parts to reuse the
        // `parts` array as much as possible:
        // [[], ...]              -> [[], ...]       // No change.
        // [['a'], ...]           -> ['a', ...]      // Inline in place.
        // [['a', 'b'], ...]      -> ['a', 'b', ...] // Inline with extension.
        // ['a', ['b'], ...]      -> ['a', 'b', ...] // Inline in place.
        // ['a', ['b', 'c'], ...] -> ['b', 'c', ...] // Inline with overlap.
        if (part.length) {
          const length = Math.min(index + 1, part.length);
          index -= length;
          parts.splice(index + 1, length, ...part);
        }
      } else {
        // Other values -- most likely numbers and `true` -- are stringified.
        name.push('' + part);
      }
    }
  }

  // We cannot escape the parts earlier as `escapeToJoin` depends on the index.
  return returnAsParts ? name.map(escape) : name.map(escapeToJoin).join('');
}

export const joinName = Object.assign(joinNameImpl, { escape, unescape });
