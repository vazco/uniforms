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

var Radio = function Radio(_ref) {
    var allowedValues = _ref.allowedValues;
    var disabled = _ref.disabled;
    var id = _ref.id;
    var label = _ref.label;
    var name = _ref.name;
    var _onChange = _ref.onChange;
    var transform = _ref.transform;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['allowedValues', 'disabled', 'id', 'label', 'name', 'onChange', 'transform', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        label && _react2.default.createElement(
            'label',
            null,
            label
        ),
        allowedValues.map(function (item) {
            return _react2.default.createElement(
                'section',
                { key: item },
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
            );
        })
    );
};

exports.default = (0, _uniforms.connectField)(Radio);