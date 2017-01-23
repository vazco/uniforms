'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error(_ref) {
    var children = _ref.children;
    var className = _ref.className;
    var errorMessage = _ref.errorMessage;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'className', 'errorMessage']);
    return !errorMessage ? _uniforms.nothing : _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)('ui', className, 'error message') }, (0, _uniforms.filterDOMProps)(props)),
        children ? children : _react2.default.createElement(
            'section',
            { className: 'header' },
            errorMessage
        )
    );
};

exports.default = (0, _uniforms.connectField)(Error, { initialValue: false });