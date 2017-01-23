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

var noneIfNaN = function noneIfNaN(x) {
    return isNaN(x) ? undefined : x;
};

var Num = function Num(_ref) {
    var decimal = _ref.decimal;
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
    var props = (0, _objectWithoutProperties3.default)(_ref, ['decimal', 'disabled', 'id', 'inputRef', 'label', 'max', 'min', 'name', 'onChange', 'placeholder', 'value']);
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
            max: max,
            min: min,
            name: name,
            onChange: function onChange(event) {
                return _onChange(noneIfNaN((decimal ? parseFloat : parseInt)(event.target.value)));
            },
            placeholder: placeholder,
            ref: inputRef,
            step: decimal ? 0.01 : 1,
            type: 'number',
            value: value === undefined ? null : value
        })
    );
};

exports.default = (0, _uniforms.connectField)(Num);