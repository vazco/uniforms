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

var xor = function xor(item, array) {
    var index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

var renderCheckboxes = function renderCheckboxes(_ref) {
    var allowedValues = _ref.allowedValues;
    var disabled = _ref.disabled;
    var fieldType = _ref.fieldType;
    var id = _ref.id;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var transform = _ref.transform;
    var value = _ref.value;
    return allowedValues.map(function (item) {
        return _react2.default.createElement(
            'section',
            { className: 'field', key: item },
            _react2.default.createElement(
                'section',
                { className: 'ui checkbox' },
                _react2.default.createElement('input', {
                    checked: fieldType === Array ? value.includes(item) : value === item,
                    disabled: disabled,
                    id: id + '-' + item,
                    name: name,
                    onChange: function onChange() {
                        return _onChange(fieldType === Array ? xor(item, value) : item);
                    },
                    type: 'checkbox'
                }),
                _react2.default.createElement(
                    'label',
                    { htmlFor: id + '-' + item },
                    transform ? transform(item) : item
                )
            )
        );
    });
};

var renderSelect = function renderSelect(_ref2) {
    var allowedValues = _ref2.allowedValues;
    var disabled = _ref2.disabled;
    var id = _ref2.id;
    var inputRef = _ref2.inputRef;
    var name = _ref2.name;
    var _onChange2 = _ref2.onChange;
    var placeholder = _ref2.placeholder;
    var transform = _ref2.transform;
    var value = _ref2.value;
    return _react2.default.createElement(
        'select',
        {
            disabled: disabled,
            id: id,
            name: name,
            onChange: function onChange(event) {
                return _onChange2(event.target.value);
            },
            ref: inputRef,
            value: value
        },
        !!placeholder && _react2.default.createElement(
            'option',
            { value: '', disabled: true, hidden: true },
            placeholder
        ),
        allowedValues.map(function (value) {
            return _react2.default.createElement(
                'option',
                { key: value, value: value },
                transform ? transform(value) : value
            );
        })
    );
};

var Select = function Select(_ref3) {
    var allowedValues = _ref3.allowedValues;
    var checkboxes = _ref3.checkboxes;
    var className = _ref3.className;
    var disabled = _ref3.disabled;
    var error = _ref3.error;
    var fieldType = _ref3.fieldType;
    var id = _ref3.id;
    var inputRef = _ref3.inputRef;
    var label = _ref3.label;
    var name = _ref3.name;
    var onChange = _ref3.onChange;
    var placeholder = _ref3.placeholder;
    var required = _ref3.required;
    var transform = _ref3.transform;
    var value = _ref3.value;
    var props = (0, _objectWithoutProperties3.default)(_ref3, ['allowedValues', 'checkboxes', 'className', 'disabled', 'error', 'fieldType', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'required', 'transform', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)({ disabled: disabled, error: error, required: required }, className, 'field') }, (0, _uniforms.filterDOMProps)(props)),
        label && _react2.default.createElement(
            'label',
            { htmlFor: id },
            label
        ),
        checkboxes || fieldType === Array ? renderCheckboxes({ allowedValues: allowedValues, disabled: disabled, id: id, name: name, onChange: onChange, transform: transform, value: value, fieldType: fieldType }) : renderSelect({ allowedValues: allowedValues, disabled: disabled, id: id, name: name, onChange: onChange, transform: transform, value: value, inputRef: inputRef, placeholder: placeholder })
    );
};

exports.default = (0, _uniforms.connectField)(Select);