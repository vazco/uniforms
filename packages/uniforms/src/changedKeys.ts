import isEqual from 'lodash/isEqual';

import { joinName } from './joinName';

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && value === Object(value) && !(value instanceof Date);
}

// eslint-disable-next-line complexity
export function changedKeys(root: string, valueA?: unknown, valueB?: unknown) {
  if (!isObject(valueA) || (valueB && typeof valueA !== typeof valueB)) {
    return isEqual(valueA, valueB) ? [] : [root];
  }

  const changed = [root];
  if (isObject(valueB)) {
    for (const key in valueA) {
      if (!(key in valueB) || !isEqual(valueA[key], valueB[key])) {
        changed.push(joinName(root, key));
      }
    }

    for (const key in valueB) {
      if (!(key in valueA)) {
        changed.push(joinName(root, key));
      }
    }

    if (changed.length === 1) {
      changed.pop();
    }
  } else {
    // eslint-disable-next-line guard-for-in
    for (const key in valueA) {
      changed.push(joinName(root, key));
    }
  }

  return changed;
}
