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

    if (typeof grid === 'number') {
        // grid value is a number [1-11]
        // if grid=1, label.col-sm-1 & input.col-sm-11
        // if grid=2, label.col-sm-2 & input.col-sm-10
        // if grid=3, label.col-sm-3 & input.col-sm-9
        // if grid=4, label.col-sm-4 & input.col-sm-8
        return gridClassNamePart('sm', grid, side);
    }

    if (typeof grid === 'string' && !isNaN(parseInt(grid))) {
        return gridClassNamePart('sm', parseInt(grid), side);
    }

    if (typeof grid === 'string') {
        return grid;
    }

    if ((typeof grid === 'undefined' ? 'undefined' : (0, _typeof3.default)(grid)) === 'object') {
        // grid value is an object config
        // eg: { xs: 6, sm: 4, md: 3 }
        return (0, _keys2.default)(grid).map(function (value, size) {
            return gridClassNamePart(size, value, side);
        });
    }
}