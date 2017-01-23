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

var Radio = function Radio(_ref) {
    var allowedValues = _ref.allowedValues;
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var id = _ref.id;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var required = _ref.required;
    var transform = _ref.transform;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['allowedValues', 'className', 'disabled', 'error', 'id', 'label', 'name', 'onChange', 'required', 'transform', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)(className, { disabled: disabled, error: error }, 'grouped fields') }, (0, _uniforms.filterDOMProps)(props)),
        label && _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)({ required: required }, 'field') },
            _react2.default.createElement(
                'label',
                null,
                label
            )
        ),
        allowedValues.map(function (item) {
            return _react2.default.createElement(
                'section',
                { className: 'field', key: item },
                _react2.default.createElement(
                    'section',
                    { className: 'ui radio checkbox' },
                    _react2.default.createElement('input', {
                        checked: item === value,
                        disabled: disabled,
                        id: id + '-' + item,
                        name: name,
                        onChange: function onChange() {
                            return _onChange(item);
                        },
                        type: 'radio'
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: id + '-' + item },
                        transform ? transform(item) : item
                    )
                )
            );
        })
    );
};

exports.default = (0, _uniforms.connectField)(Radio);