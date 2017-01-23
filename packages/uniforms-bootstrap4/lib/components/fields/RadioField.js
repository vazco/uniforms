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

var Radio = function Radio(props) {
    return (0, _wrapField2.default)(props, props.allowedValues.map(function (item) {
        return _react2.default.createElement(
            'section',
            { key: item, className: (0, _classnames2.default)(props.inputClassName, 'radio' + (props.inline ? '-inline' : '')) },
            _react2.default.createElement(
                'label',
                { htmlFor: props.id + '-' + item },
                _react2.default.createElement('input', {
                    checked: item === props.value,
                    disabled: props.disabled,
                    id: props.id + '-' + item,
                    name: props.name,
                    onChange: function onChange() {
                        return props.onChange(item);
                    },
                    type: 'radio'
                }),
                props.transform ? props.transform(item) : item
            )
        );
    }));
};

exports.default = (0, _uniforms.connectField)(Radio);