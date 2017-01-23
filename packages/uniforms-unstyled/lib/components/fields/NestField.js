'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniforms = require('uniforms');

var _AutoField = require('./AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nest = function Nest(_ref) {
    var children = _ref.children;
    var fields = _ref.fields;
    var label = _ref.label;
    var name = _ref.name;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'fields', 'label', 'name']);
    return _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        label && _react2.default.createElement(
            'label',
            null,
            label
        ),
        children ? (0, _uniforms.injectName)(name, children) : fields.map(function (key) {
            return _react2.default.createElement(_AutoField2.default, { key: key, name: (0, _uniforms.joinName)(name, key) });
        })
    );
};

exports.default = (0, _uniforms.connectField)(Nest, { includeInChain: false });