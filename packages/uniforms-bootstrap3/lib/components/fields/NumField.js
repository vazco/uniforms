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

var noneIfNaN = function noneIfNaN(x) {
    return isNaN(x) ? undefined : x;
};

var Num = function Num(props) {
    return _react2.default.createElement(
        _FormGroup2.default,
        props,
        _react2.default.createElement('input', {
            className: (0, _classnames2.default)(props.inputClassName, 'form-control', { 'form-control-danger': props.error }),
            disabled: props.disabled,
            id: props.id,
            max: props.max,
            min: props.min,
            name: props.name,
            onChange: function onChange(event) {
                return props.onChange(noneIfNaN((props.decimal ? parseFloat : parseInt)(event.target.value)));
            },
            placeholder: props.placeholder,
            ref: props.inputRef,
            step: props.decimal ? 0.01 : 1,
            type: 'number',
            value: props.value === undefined ? null : props.value
        })
    );
};

exports.default = (0, _uniforms.connectField)(Num);