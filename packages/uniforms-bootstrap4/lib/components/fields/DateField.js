'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _wrapField = require('../../lib/wrapField');

var _wrapField2 = _interopRequireDefault(_wrapField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormat = function dateFormat(value) {
    return value && value.toISOString().slice(0, -8);
};
var dateParse = function dateParse(timestamp, onChange) {
    var date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

var Date_ = function Date_(props) {
    return (0, _wrapField2.default)(props, _react2.default.createElement('input', {
        className: (0, _classnames2.default)(props.inputClassName, 'form-control', { 'form-control-danger': props.error }),
        disabled: props.disabled,
        id: props.id,
        max: dateFormat(props.max),
        min: dateFormat(props.min),
        name: props.name,
        onChange: function onChange(event) {
            return dateParse(event.target.valueAsNumber, props.onChange);
        },
        placeholder: props.placeholder,
        ref: props.inputRef,
        type: 'datetime-local',
        value: dateFormat(props.value)
    }));
};

Date_.displayName = 'Date';

exports.default = (0, _uniforms.connectField)(Date_);