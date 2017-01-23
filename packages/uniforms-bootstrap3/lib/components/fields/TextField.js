'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(props) {
    return _react2.default.createElement(
        _FormGroup2.default,
        (0, _extends3.default)({ feedbackable: true }, props),
        _react2.default.createElement('input', {
            className: (0, _classnames2.default)(props.inputClassName, 'form-control', { 'form-control-danger': props.error }),
            disabled: props.disabled,
            id: props.id,
            name: props.name,
            onChange: function onChange(event) {
                return props.onChange(event.target.value);
            },
            placeholder: props.placeholder,
            ref: props.inputRef,
            type: props.type,
            value: props.value
        }),
        props.error && _react2.default.createElement('i', { className: 'glyphicon glyphicon-remove form-control-feedback' })
    );
};

Text.defaultProps = {
    type: 'text'
};

exports.default = (0, _uniforms.connectField)(Text);