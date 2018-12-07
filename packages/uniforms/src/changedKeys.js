// @flow

import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

import joinName from './joinName';

export default function changedKeys(root: string, valueA: any, valueB: any): string[] {
  if (valueA === Object(valueA) && !(valueA instanceof Date)) {
    if (valueB) {
      let pairsA;
      let pairsB;

      if (Array.isArray(valueA)) {
        pairsA = valueA.map((value, index) => [value, index]);
        pairsB = valueB.map((value, index) => [value, index]);
      } else {
        pairsA = Object.keys(valueA).map(key => [valueA[key], key]);
        pairsB = Object.keys(valueB).map(key => [valueB[key], key]);
      }

      const changed = xorWith(pairsA, pairsB, isEqual).map(pair => joinName(root, pair[1]));

      if (changed.length) {
        changed.unshift(root);
      }

      return changed;
    }

    return [root].concat(Object.keys(valueA).map(key => joinName(root, key)));
  }

  return isEqual(valueA, valueB) ? [] : [root];
}
