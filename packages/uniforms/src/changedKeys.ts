import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

import { joinName } from './joinName';

export function changedKeys<T>(root: string, valueA?: T, valueB?: T) {
  if (!valueA || valueA !== Object(valueA) || valueA instanceof Date) {
    return isEqual(valueA, valueB) ? [] : [root];
  }
  if (!valueB) {
    return [root, ...Object.keys(valueA).map(key => joinName(root, key))];
  }

  const changed = xorWith(
    Object.entries(valueA),
    Object.entries(valueB),
    isEqual,
  ).map(pair => joinName(root, pair[0]));

  if (changed.length) {
    changed.unshift(root);
  }
  return changed;
}
