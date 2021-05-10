import isEqual from 'lodash/isEqual';

import { joinName } from './joinName';

// eslint-disable-next-line complexity
export function changedKeys<T>(root: string, valueA?: T, valueB?: T) {
  if (!valueA || valueA !== Object(valueA) || valueA instanceof Date) {
    return isEqual(valueA, valueB) ? [] : [root];
  }

  const changed = [root];
  if (valueB) {
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
