'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniforms = require('uniforms');

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

var Date_ = function Date_(_ref) {
    var disabled = _ref.disabled;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var max = _ref.max;
    var min = _ref.min;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'max', 'min', 'name', 'onChange', 'placeholder', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        label && _react2.default.createElement(
            'label',
            { htmlFor: id },
            label
        ),
        _react2.default.createElement('input', {
            disabled: disabled,
            id: id,
            max: dateFormat(max),
            min: dateFormat(min),
            name: name,
            onChange: function onChange(event) {
                return dateParse(event.target.valueAsNumber, _onChange);
            },
            placeholder: placeholder,
            ref: inputRef,
            type: 'datetime-local',
            value: dateFormat(value)
        })
    );
};

Date_.displayName = 'Date';

exports.default = (0, _uniforms.connectField)(Date_);