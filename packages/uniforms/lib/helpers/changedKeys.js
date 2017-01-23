'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = changedKeys;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.xorwith');

var _lodash4 = _interopRequireDefault(_lodash3);

var _joinName = require('./joinName');

var _joinName2 = _interopRequireDefault(_joinName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function changedKeys(root, valueA, valueB) {
    var base = (0, _lodash2.default)(valueA, valueB) ? [] : [root];

    if (valueA === Object(valueA) && !(valueA instanceof Date)) {
        if (valueB) {
            var pairsA = void 0;
            var pairsB = void 0;

            if (Array.isArray(valueA)) {
                pairsA = valueA.map(function (value, index) {
                    return [value, index];
                });
                pairsB = valueB.map(function (value, index) {
                    return [value, index];
                });
            } else {
                pairsA = (0, _keys2.default)(valueA).map(function (key) {
                    return [valueA[key], key];
                });
                pairsB = (0, _keys2.default)(valueB).map(function (key) {
                    return [valueB[key], key];
                });
            }

            return base.concat((0, _lodash4.default)(pairsA, pairsB, _lodash2.default).map(function (pair) {
                return (0, _joinName2.default)(root, pair[1]);
            }).filter(function (value, index, array) {
                return array.indexOf(value) === index;
            }));
        }

        return base.concat((0, _keys2.default)(valueA).map(function (key) {
            return (0, _joinName2.default)(root, key);
        }));
    }

    return base;
}