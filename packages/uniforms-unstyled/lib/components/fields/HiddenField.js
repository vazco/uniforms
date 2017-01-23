'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniforms = require('uniforms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HiddenField = function (_BaseField) {
    (0, _inherits3.default)(HiddenField, _BaseField);

    function HiddenField() {
        (0, _classCallCheck3.default)(this, HiddenField);
        return (0, _possibleConstructorReturn3.default)(this, (HiddenField.__proto__ || (0, _getPrototypeOf2.default)(HiddenField)).apply(this, arguments));
    }

    (0, _createClass3.default)(HiddenField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var valueDesired = _ref.value;

            if (valueDesired === undefined) {
                return;
            }

            var props = this.getFieldProps(undefined, { overrideValue: true });
            if (props.value !== valueDesired) {
                props.onChange(valueDesired);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.getFieldProps();

            return props.noDOM ? _uniforms.nothing : _react2.default.createElement('input', (0, _extends3.default)({ ref: props.inputRef, type: 'hidden', value: props.value }, (0, _uniforms.filterDOMProps)(props)));
        }
    }]);
    return HiddenField;
}(_uniforms.BaseField);

exports.default = HiddenField;