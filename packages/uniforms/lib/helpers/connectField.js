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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = connectField;

var _react = require('react');

var _BaseField = require('../components/fields/BaseField');

var _BaseField2 = _interopRequireDefault(_BaseField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectField(component) {
    var _class, _temp;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref$mapProps = _ref.mapProps;
    var mapProps = _ref$mapProps === undefined ? function (x) {
        return x;
    } : _ref$mapProps;
    var _ref$baseField = _ref.baseField;
    var baseField = _ref$baseField === undefined ? _BaseField2.default : _ref$baseField;
    var _ref$ensureValue = _ref.ensureValue;
    var ensureValue = _ref$ensureValue === undefined ? true : _ref$ensureValue;
    var _ref$includeInChain = _ref.includeInChain;
    var includeInChain = _ref$includeInChain === undefined ? true : _ref$includeInChain;
    var _ref$includeParent = _ref.includeParent;
    var includeParent = _ref$includeParent === undefined ? false : _ref$includeParent;
    var _ref$initialValue = _ref.initialValue;
    var initialValue = _ref$initialValue === undefined ? true : _ref$initialValue;

    return _temp = _class = function (_baseField) {
        (0, _inherits3.default)(_class, _baseField);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);

            var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

            (0, _extends3.default)(_this.options, {
                ensureValue: ensureValue,
                includeInChain: includeInChain,
                includeParent: includeParent,
                initialValue: initialValue
            });
            return _this;
        }

        (0, _createClass3.default)(_class, [{
            key: 'getChildContextName',
            value: function getChildContextName() {
                return this.options.includeInChain ? (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getChildContextName', this).call(this) : this.context.uniforms.name;
            }
        }, {
            key: 'render',
            value: function render() {
                return (0, _react.createElement)(component, mapProps(this.getFieldProps(undefined, {
                    ensureValue: this.options.ensureValue,
                    includeParent: this.options.includeParent
                })));
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                if (this.options.initialValue) {
                    var props = this.getFieldProps(undefined, { explicitInitialValue: true, includeParent: false });

                    // https://github.com/vazco/uniforms/issues/52
                    // If field is initially rendered with value, we treat it as an initial value.
                    if (this.props.value !== undefined) {
                        props.onChange(this.props.value);
                        return;
                    }

                    if (props.value === undefined && props.required) {
                        props.onChange(props.initialValue);
                    }
                }
            }
        }]);
        return _class;
    }(baseField), _class.displayName = (baseField.displayName || baseField.name) + '(' + (component.displayName || component.name) + ')', _temp;
}