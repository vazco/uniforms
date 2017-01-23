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

var Text = function Text(_ref) {
    var disabled = _ref.disabled;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var placeholder = _ref.placeholder;
    var type = _ref.type;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'type', 'value']);
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
            name: name,
            onChange: function onChange(event) {
                return _onChange(event.target.value);
            },
            placeholder: placeholder,
            ref: inputRef,
            type: type,
            value: value
        })
    );
};

Text.defaultProps = {
    type: 'text'
};

exports.default = (0, _uniforms.connectField)(Text);