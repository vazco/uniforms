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

var LongText = function LongText(_ref) {
    var disabled = _ref.disabled;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var placeholder = _ref.placeholder;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        label && _react2.default.createElement(
            'label',
            null,
            label
        ),
        _react2.default.createElement('textarea', {
            disabled: disabled,
            id: id,
            name: name,
            onChange: function onChange(event) {
                return _onChange(event.target.value);
            },
            placeholder: placeholder,
            ref: inputRef,
            value: value
        })
    );
};

exports.default = (0, _uniforms.connectField)(LongText);