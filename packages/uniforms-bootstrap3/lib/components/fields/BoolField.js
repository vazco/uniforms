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

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bool = function Bool(_ref) {
    var label = _ref.label;
    var labelBefore = _ref.labelBefore;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['label', 'labelBefore']);
    return _react2.default.createElement(
        _FormGroup2.default,
        (0, _extends3.default)({ label: labelBefore }, props),
        _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)(props.inputClassName, 'checkbox' + (props.inline ? '-inline' : '')) },
            _react2.default.createElement(
                'label',
                { htmlFor: props.id },
                _react2.default.createElement('input', {
                    checked: props.value,
                    disabled: props.disabled,
                    id: props.id,
                    name: props.name,
                    onChange: function onChange() {
                        return props.onChange(!props.value);
                    },
                    ref: props.inputRef,
                    type: 'checkbox'
                }),
                '\xA0',
                label
            )
        )
    );
};

exports.default = (0, _uniforms.connectField)(Bool);