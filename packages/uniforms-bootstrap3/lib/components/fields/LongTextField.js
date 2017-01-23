'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LongText = function LongText(props) {
    return _react2.default.createElement(
        _FormGroup2.default,
        props,
        _react2.default.createElement('textarea', {
            className: (0, _classnames2.default)(props.inputClassName, 'form-control', { 'form-control-danger': props.error }),
            disabled: props.disabled,
            id: props.id,
            name: props.name,
            onChange: function onChange(event) {
                return props.onChange(event.target.value);
            },
            placeholder: props.placeholder,
            ref: props.inputRef,
            value: props.value
        })
    );
};

exports.default = (0, _uniforms.connectField)(LongText);