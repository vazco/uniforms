'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

var _react = require('react');

var _BaseForm = require('../forms/BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _joinName = require('../../helpers/joinName');

var _joinName2 = _interopRequireDefault(_joinName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseField = function (_Component) {
    (0, _inherits3.default)(BaseField, _Component);

    function BaseField() {
        (0, _classCallCheck3.default)(this, BaseField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseField.__proto__ || (0, _getPrototypeOf2.default)(BaseField)).apply(this, arguments));

        _this.options = {};

        _this.randomId = _this.context.uniforms.randomId();

        _this.findValue = _this.findValue.bind(_this);
        _this.findField = _this.findField.bind(_this);
        _this.findError = _this.findError.bind(_this);

        _this.getFieldProps = _this.getFieldProps.bind(_this);

        _this.getChildContextName = _this.getChildContextName.bind(_this);
        _this.getChildContextError = _this.getChildContextError.bind(_this);
        _this.getChildContextModel = _this.getChildContextModel.bind(_this);
        _this.getChildContextState = _this.getChildContextState.bind(_this);
        _this.getChildContextSchema = _this.getChildContextSchema.bind(_this);
        _this.getChildContextOnChange = _this.getChildContextOnChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(BaseField, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, _ref) {
            var nextContext = _ref.uniforms;

            var prevProps = this.props;
            var prevContext = this.context.uniforms;

            if (!(0, _lodash4.default)(prevProps, nextProps)) {
                return true;
            }

            var prevName = (0, _joinName2.default)(prevContext.name, prevProps.name);
            var nextName = (0, _joinName2.default)(nextContext.name, nextProps.name);

            if (prevName !== nextName) {
                return true;
            }

            if (nextName.indexOf('.') !== -1) {
                var prevParentValue = (0, _lodash2.default)(prevContext.model, prevName.replace(/(.+)\..+$/, '$1'));
                var nextParentValue = (0, _lodash2.default)(nextContext.model, nextName.replace(/(.+)\..+$/, '$1'));

                // eslint-disable-next-line max-len
                if (Array.isArray(nextParentValue) && (!prevParentValue || prevParentValue.length !== nextParentValue.length)) {
                    return true;
                }
            }

            var prevValue = (0, _lodash2.default)(prevContext.model, prevName);
            var nextValue = (0, _lodash2.default)(nextContext.model, nextName);

            if (!(0, _lodash4.default)(prevValue, nextValue)) {
                return true;
            }

            if (prevContext.error !== nextContext.error) {
                var prevError = prevContext.error && prevContext.schema.getError(prevName, prevContext.error);
                var nextError = nextContext.error && nextContext.schema.getError(nextName, nextContext.error);

                if (!(0, _lodash4.default)(prevError, nextError)) {
                    return true;
                }

                // TODO: This is a workaround for List and Nest fields
                //       Those should update, if their child error has changed
                // eslint-disable-next-line max-len
                if (nextValue && (typeof nextValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(nextValue)) === 'object' && Object.prototype.toString.call(nextValue) !== '[object Date]') {
                    return true;
                }
            }

            if (nextContext.schema !== prevContext.schema) {
                return true;
            }

            return false;
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                uniforms: {
                    name: this.getChildContextName(),
                    error: this.getChildContextError(),
                    model: this.getChildContextModel(),
                    state: this.getChildContextState(),
                    schema: this.getChildContextSchema(),
                    onChange: this.getChildContextOnChange(),
                    randomId: this.context.uniforms.randomId
                }
            };
        }
    }, {
        key: 'getChildContextName',
        value: function getChildContextName() {
            return (0, _joinName2.default)(null, this.context.uniforms.name, this.props.name);
        }
    }, {
        key: 'getChildContextError',
        value: function getChildContextError() {
            return this.context.uniforms.error;
        }
    }, {
        key: 'getChildContextModel',
        value: function getChildContextModel() {
            return this.context.uniforms.model;
        }
    }, {
        key: 'getChildContextState',
        value: function getChildContextState() {
            var state = this.context.uniforms.state;
            var props = this.props;

            var propagate = function propagate(name) {
                return props[name] === undefined || props[name] === null ? state[name] : !!props[name];
            };

            return (0, _extends3.default)({}, state, {

                label: propagate('label'),
                disabled: propagate('disabled'),
                placeholder: propagate('placeholder')
            });
        }
    }, {
        key: 'getChildContextSchema',
        value: function getChildContextSchema() {
            return this.context.uniforms.schema;
        }
    }, {
        key: 'getChildContextOnChange',
        value: function getChildContextOnChange() {
            return this.context.uniforms.onChange;
        }

        // eslint-disable-next-line complexity

    }, {
        key: 'getFieldProps',
        value: function getFieldProps(name) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options;

            var ensureValue = _ref2.ensureValue;
            var explicitInitialValue = _ref2.explicitInitialValue;
            var includeParent = _ref2.includeParent;
            var overrideValue = _ref2.overrideValue;

            var context = this.context.uniforms;
            var props = (0, _extends3.default)({}, this.getChildContextState(), this.props);

            if (name === undefined) {
                name = (0, _joinName2.default)(context.name, props.name);
            }

            var field = context.schema.getField(name);
            var fieldType = context.schema.getType(name);
            var schemaProps = context.schema.getProps(name, props);

            var error = context.schema.getError(name, context.error);
            var fields = context.schema.getSubfields(name);
            var parent = includeParent && name.indexOf('.') !== -1 ? this.getFieldProps(name.replace(/(.+)\..+$/, '$1'), { includeParent: false }) : null;

            var id = props.id || this.randomId;

            var errorMessage = context.schema.getErrorMessage(name, context.error);

            var label = props.label ? props.label === true ? schemaProps.label : props.label : props.label === null ? null : '';

            var placeholder = props.placeholder ? props.placeholder === true ? schemaProps.label : props.placeholder : '';

            var changed = !!(0, _lodash2.default)(context.state.changedMap, name);

            var value = (0, _lodash2.default)(context.model, name);
            if (value === undefined && !explicitInitialValue) {
                value = context.schema.getInitialValue(name, this.props);

                // This prevents (un)controlled input change warning.
                // More info: https://fb.me/react-controlled-components.
                if (value === undefined && ensureValue) {
                    value = '';
                }
            } else if (explicitInitialValue) {
                props.initialValue = context.schema.getInitialValue(name, this.props);
            }

            var findValue = this.findValue;
            var findField = this.findField;
            var findError = this.findError;

            var onChange = function onChange(value) {
                var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;
                return context.onChange(key, value);
            };

            return (0, _extends3.default)({
                changed: changed,
                error: error,
                errorMessage: errorMessage,
                field: field,
                fieldType: fieldType,
                fields: fields,
                findError: findError,
                findField: findField,
                findValue: findValue,
                id: id,
                onChange: onChange,
                parent: parent

            }, value !== undefined && { value: value }, props, schemaProps, overrideValue && { value: value }, {

                label: label,
                name: name,
                placeholder: placeholder
            });
        }
    }, {
        key: 'findError',
        value: function findError(name) {
            return this.context.uniforms.schema.getError(name, this.context.uniforms.error);
        }
    }, {
        key: 'findField',
        value: function findField(name) {
            return this.context.uniforms.schema.getField(name);
        }
    }, {
        key: 'findValue',
        value: function findValue(name) {
            return (0, _lodash2.default)(this.context.uniforms.model, name);
        }
    }]);
    return BaseField;
}(_react.Component);

BaseField.propTypes = {
    id: _react.PropTypes.string,

    name: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,

    label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.node]),
    placeholder: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string])
};
BaseField.contextTypes = _BaseForm2.default.childContextTypes;
BaseField.childContextTypes = _BaseForm2.default.childContextTypes;
exports.default = BaseField;