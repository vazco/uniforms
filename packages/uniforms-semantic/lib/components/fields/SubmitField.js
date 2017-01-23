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

var SubmitField = function SubmitField(_ref, _ref2) {
    var className = _ref.className;
    var inputRef = _ref.inputRef;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'inputRef', 'value']);
    var _ref2$uniforms = _ref2.uniforms;
    var error = _ref2$uniforms.error;
    var disabled = _ref2$uniforms.state.disabled;
    return _react2.default.createElement('input', (0, _extends3.default)({
        className: (0, _classnames2.default)('ui', className, 'button'),
        disabled: !!(error || disabled),
        ref: inputRef,
        type: 'submit',
        value: value
    }, (0, _uniforms.filterDOMProps)(props)));
};

SubmitField.contextTypes = _uniforms.BaseField.contextTypes;

exports.default = SubmitField;