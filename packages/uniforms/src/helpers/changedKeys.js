import isEqual from 'lodash.isequal';
import xorWith from 'lodash.xorwith';

import joinName from './joinName';

export default function changedKeys (root, valueA, valueB) {
    const base = isEqual(valueA, valueB) ? [] : [root];

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

            return base.concat(
                xorWith(pairsA, pairsB, isEqual)
                    .map(pair => joinName(root, pair[1]))
                    .filter((value, index, array) => array.indexOf(value) === index)
            );
        }

        return base.concat(Object.keys(valueA).map(key => joinName(root, key)));
    }

    return base;
}
