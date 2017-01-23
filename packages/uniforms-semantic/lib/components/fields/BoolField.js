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

var Bool = function Bool(_ref) {
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var id = _ref.id;
    var inputRef = _ref.inputRef;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var required = _ref.required;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'disabled', 'error', 'id', 'inputRef', 'label', 'name', 'onChange', 'required', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)(className, { disabled: disabled, error: error, required: required }, 'field') }, (0, _uniforms.filterDOMProps)(props)),
        _react2.default.createElement(
            'section',
            { className: 'ui checkbox' },
            _react2.default.createElement('input', {
                checked: value,
                className: 'hidden',
                disabled: disabled,
                id: id,
                name: name,
                onChange: function onChange() {
                    return _onChange(!value);
                },
                ref: inputRef,
                type: 'checkbox'
            }),
            _react2.default.createElement(
                'label',
                { htmlFor: id },
                label
            )
        )
    );
};

exports.default = (0, _uniforms.connectField)(Bool);