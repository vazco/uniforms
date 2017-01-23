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

var Text = function Text(_ref) {
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var icon = _ref.icon;
    var iconLeft = _ref.iconLeft;
    var iconProps = _ref.iconProps;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var placeholder = _ref.placeholder;
    var required = _ref.required;
    var type = _ref.type;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'disabled', 'error', 'icon', 'iconLeft', 'iconProps', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'required', 'type', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)(className, { disabled: disabled, error: error, required: required }, 'field') }, (0, _uniforms.filterDOMProps)(props)),
        label && _react2.default.createElement(
            'label',
            { htmlFor: id },
            label
        ),
        _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)('ui', { left: iconLeft, icon: icon || iconLeft }, 'input') },
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
            }),
            (icon || iconLeft) && _react2.default.createElement('i', (0, _extends3.default)({ className: (icon || iconLeft) + ' icon' }, iconProps))
        )
    );
};

Text.defaultProps = {
    type: 'text'
};

exports.default = (0, _uniforms.connectField)(Text);