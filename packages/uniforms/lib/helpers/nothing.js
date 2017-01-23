'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React@0.14.x workaround
// https://github.com/vazco/uniforms/issues/42
// https://github.com/facebook/react/issues/5355
exports.default = _react2.default.version.slice(0, 4) === '0.14' ? _react2.default.createElement('noscript', null) : null;