'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xor = function xor(item, array) {
    var index = array.indexOf(item);
    if (index === -1) {
        return array.concat([item]);
    }

    return array.slice(0, index).concat(array.slice(index + 1));
};

var renderCheckboxes = function renderCheckboxes(props) {
    return props.allowedValues.map(function (item) {
        return _react2.default.createElement(
            'section',
            { key: item, className: (0, _classnames2.default)(props.inputClassName, 'checkbox' + (props.inline ? '-inline' : '')) },
            _react2.default.createElement(
                'label',
                { htmlFor: props.id + '-' + item },
                _react2.default.createElement('input', {
                    checked: props.fieldType === Array ? props.value.includes(item) : props.value === item,
                    disabled: props.disabled,
                    id: props.id + '-' + item,
                    name: props.name,
                    onChange: function onChange() {
                        return props.onChange(props.fieldType === Array ? xor(item, props.value) : item);
                    },
                    type: 'checkbox'
                }),
                props.transform ? props.transform(item) : item
            )
        );
    });
};

var renderSelect = function renderSelect(props) {
    return _react2.default.createElement(
        'select',
        {
            className: (0, _classnames2.default)(props.inputClassName, 'form-control', { 'form-control-danger': props.error }),
            disabled: props.disabled,
            id: props.id,
            name: props.name,
            onChange: function onChange(event) {
                return props.onChange(event.target.value);
            },
            ref: props.inputRef,
            value: props.value
        },
        !!props.placeholder && _react2.default.createElement(
            'option',
            { value: '', disabled: true, hidden: true },
            props.placeholder
        ),
        props.allowedValues.map(function (value) {
            return _react2.default.createElement(
                'option',
                { key: value, value: value },
                props.transform ? props.transform(value) : value
            );
        })
    );
};

var Select = function Select(props) {
    return _react2.default.createElement(
        _FormGroup2.default,
        props,
        props.checkboxes || props.fieldType === Array ? renderCheckboxes(props) : renderSelect(props)
    );
};

exports.default = (0, _uniforms.connectField)(Select);