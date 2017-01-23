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

var Bool = function Bool(_ref) {
    var disabled = _ref.disabled;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        _react2.default.createElement('input', {
            checked: value,
            disabled: disabled,
            id: id,
            name: name,
            onChange: function onChange() {
                return disabled || _onChange(!value);
            },
            ref: inputRef,
            type: 'checkbox'
        }),
        label && _react2.default.createElement(
            'label',
            { htmlFor: id },
            label
        )
    );
};

exports.default = (0, _uniforms.connectField)(Bool);