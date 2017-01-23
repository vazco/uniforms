'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.set');

var _lodash4 = _interopRequireDefault(_lodash3);

var _changedKeys = require('../../helpers/changedKeys');

var _changedKeys2 = _interopRequireDefault(_changedKeys);

var _bridges = require('../../bridges');

var _bridges2 = _interopRequireDefault(_bridges);

var _randomIds = require('../../helpers/randomIds');

var _randomIds2 = _interopRequireDefault(_randomIds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseForm = function (_Component) {
    (0, _inherits3.default)(BaseForm, _Component);

    function BaseForm() {
        (0, _classCallCheck3.default)(this, BaseForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseForm.__proto__ || (0, _getPrototypeOf2.default)(BaseForm)).apply(this, arguments));

        _this.state = { bridge: (0, _bridges2.default)(_this.props.schema), resetCount: 0 };

        _this.changed = false;
        _this.changedMap = {};
        _this.delayId = false;
        _this.randomId = (0, _randomIds2.default)(_this.props.id);

        _this.onReset = _this.reset = _this.onReset.bind(_this);
        _this.onChange = _this.change = _this.onChange.bind(_this);
        _this.onSubmit = _this.submit = _this.onSubmit.bind(_this);

        _this.getModel = _this.getModel.bind(_this);
        _this.getChangedKeys = _this.getChangedKeys.bind(_this);
        _this.getNativeFormProps = _this.getNativeFormProps.bind(_this);

        _this.getChildContextName = _this.getChildContextName.bind(_this);
        _this.getChildContextError = _this.getChildContextError.bind(_this);
        _this.getChildContextModel = _this.getChildContextModel.bind(_this);
        _this.getChildContextState = _this.getChildContextState.bind(_this);
        _this.getChildContextSchema = _this.getChildContextSchema.bind(_this);
        _this.getChildContextOnChange = _this.getChildContextOnChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(BaseForm, [{
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
                    randomId: this.randomId
                }
            };
        }
    }, {
        key: 'getChildContextName',
        value: function getChildContextName() {
            return [];
        }
    }, {
        key: 'getChildContextError',
        value: function getChildContextError() {
            return this.props.error;
        }
    }, {
        key: 'getChildContextModel',
        value: function getChildContextModel() {
            return this.props.model;
        }
    }, {
        key: 'getChildContextState',
        value: function getChildContextState() {
            return {
                changed: !!this.changed,
                changedMap: this.changedMap,

                label: !!this.props.label,
                disabled: !!this.props.disabled,
                placeholder: !!this.props.placeholder
            };
        }
    }, {
        key: 'getChildContextSchema',
        value: function getChildContextSchema() {
            return this.state.bridge;
        }
    }, {
        key: 'getChildContextOnChange',
        value: function getChildContextOnChange() {
            return this.onChange;
        }
    }, {
        key: 'getModel',
        value: function getModel() {
            return this.getChildContextModel();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.setState({}, function () {
                _this2.changed = false;
                _this2.changedMap = {};
                _this2.forceUpdate();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var schema = _ref.schema;

            if (this.props.schema !== schema) {
                this.setState({ bridge: (0, _bridges2.default)(schema) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('form', this.getNativeFormProps());
        }
    }, {
        key: 'getChangedKeys',
        value: function getChangedKeys(root, valueA, valueB) {
            return (0, _changedKeys2.default)(root, valueA, valueB);
        }
    }, {
        key: 'getNativeFormProps',
        value: function getNativeFormProps() {
            var _props = this.props;
            var autosave = _props.autosave;
            var autosaveDelay = _props.autosaveDelay;
            var disabled = _props.disabled;
            var error = _props.error;
            var label = _props.label;
            var model = _props.model;
            var onChange = _props.onChange;
            var onSubmit = _props.onSubmit;
            var onSubmitFailure = _props.onSubmitFailure;
            var onSubmitSuccess = _props.onSubmitSuccess;
            var placeholder = _props.placeholder;
            var schema = _props.schema;
            var props = (0, _objectWithoutProperties3.default)(_props, ['autosave', 'autosaveDelay', 'disabled', 'error', 'label', 'model', 'onChange', 'onSubmit', 'onSubmitFailure', 'onSubmitSuccess', 'placeholder', 'schema']);


            return (0, _extends3.default)({}, props, {

                onSubmit: this.onSubmit,

                key: 'reset-' + this.state.resetCount
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(key, value) {
            var _this3 = this;

            // Do not set `changed` before componentDidMount
            if (this.changed !== null) {
                this.changed = true;
                this.getChangedKeys(key, value, (0, _lodash2.default)(this.getModel(), key)).forEach(function (key) {
                    return (0, _lodash4.default)(_this3.changedMap, key, {});
                });
            }

            if (this.props.onChange) {
                this.props.onChange(key, value);
            }

            // Do not call `onSubmit` before componentDidMount
            if (this.changed !== null && this.props.autosave) {
                if (this.delayId) {
                    this.delayId = clearTimeout(this.delayId);
                }

                if (this.props.autosaveDelay > 0) {
                    this.delayId = setTimeout(this.onSubmit, this.props.autosaveDelay);
                } else {
                    this.onSubmit();
                }
            }
        }
    }, {
        key: 'onReset',
        value: function onReset() {
            var _this4 = this;

            this.setState(function (state) {
                _this4.changed = false;
                _this4.changedMap = {};

                return { resetCount: state.resetCount + 1 };
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            var promise = _promise2.default.resolve(this.props.onSubmit && this.props.onSubmit(this.getModel()));

            promise.then(this.props.onSubmitSuccess, this.props.onSubmitFailure);

            return promise;
        }
    }]);
    return BaseForm;
}(_react.Component);

BaseForm.displayName = 'Form';
BaseForm.defaultProps = {
    model: {},
    label: true,

    autosave: false,
    autosaveDelay: 0,

    noValidate: true
};
BaseForm.propTypes = {
    error: _react.PropTypes.object,
    model: _react.PropTypes.object,
    schema: _react.PropTypes.any.isRequired,

    onChange: _react.PropTypes.func,
    onSubmit: _react.PropTypes.func,
    onSubmitFailure: _react.PropTypes.func,
    onSubmitSuccess: _react.PropTypes.func,

    label: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    placeholder: _react.PropTypes.bool,

    autosave: _react.PropTypes.bool,
    autosaveDelay: _react.PropTypes.number
};
BaseForm.childContextTypes = {
    uniforms: _react.PropTypes.shape({
        name: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,

        error: _react.PropTypes.object,
        model: _react.PropTypes.object.isRequired,

        schema: _react.PropTypes.shape({
            getError: _react.PropTypes.func.isRequired,
            getErrorMessage: _react.PropTypes.func.isRequired,
            getErrorMessages: _react.PropTypes.func.isRequired,
            getField: _react.PropTypes.func.isRequired,
            getInitialValue: _react.PropTypes.func.isRequired,
            getProps: _react.PropTypes.func.isRequired,
            getSubfields: _react.PropTypes.func.isRequired,
            getType: _react.PropTypes.func.isRequired,
            getValidator: _react.PropTypes.func.isRequired
        }).isRequired,

        state: _react.PropTypes.shape({
            changed: _react.PropTypes.bool.isRequired,
            changedMap: _react.PropTypes.object.isRequired,

            label: _react.PropTypes.bool.isRequired,
            disabled: _react.PropTypes.bool.isRequired,
            placeholder: _react.PropTypes.bool.isRequired
        }).isRequired,

        onChange: _react.PropTypes.func.isRequired,
        randomId: _react.PropTypes.func.isRequired
    }).isRequired
};
exports.default = BaseForm;