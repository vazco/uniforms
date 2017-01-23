'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = gridClassName;

var _uniforms = require('uniforms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uniforms.filterDOMProps.register('grid');

function gridClassNamePart(size, value, side) {
    return side === 'label' ? 'col-' + size + '-' + value : 'col-' + size + '-' + (12 - value);
}

function gridClassName(grid, side) {
    if (!grid) {
        return '';
    }

    // Example: 6
    if (typeof grid === 'number') {
        return gridClassNamePart('sm', grid, side);
    }

    // Example: '6'
    if (typeof grid === 'string' && !isNaN(parseInt(grid))) {
        return gridClassNamePart('sm', parseInt(grid), side);
    }

    // Example: 'col-6-md'
    if (typeof grid === 'string') {
        return grid;
    }

    // Example: {xs: 6, sm: 4, md: 3}
    if ((typeof grid === 'undefined' ? 'undefined' : (0, _typeof3.default)(grid)) === 'object') {
        return (0, _keys2.default)(grid).map(function (size) {
            return gridClassNamePart(size, grid[size], side);
        });
    }
}