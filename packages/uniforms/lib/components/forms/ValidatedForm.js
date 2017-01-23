'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.set');

var _lodash6 = _interopRequireDefault(_lodash5);

var _react = require('react');

var _BaseForm = require('./BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Silent `Uncaught (in promise)` warnings
var __unhandledMark = typeof _symbol2.default === 'undefined' ? '__uniformsPromiseMark' : (0, _symbol2.default)();
var __unhandled = function __unhandled(event) {
    return event && event.reason && event.reason[__unhandledMark] && event.preventDefault();
};

if (typeof process !== 'undefined') {
    process.addListener('unhandledRejection', __unhandled);
}

if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', __unhandled);
}

var Validated = function Validated(parent) {
    var _class, _temp;

    return _temp = _class = function (_parent) {
        (0, _inherits3.default)(_class, _parent);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);

            var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

            _this.state = (0, _extends3.default)({}, _this.state, {

                error: null,
                validate: false,
                validator: _this.getChildContextSchema().getValidator(_this.props.validator)
            });

            _this.onValidate = _this.validate = _this.onValidate.bind(_this);
            _this.onValidateModel = _this.validateModel = _this.onValidateModel.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(_class, [{
            key: 'getChildContextError',
            value: function getChildContextError() {
                return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getChildContextError', this).call(this) || this.state.error;
            }
        }, {
            key: 'getNativeFormProps',
            value: function getNativeFormProps() {
                var _get$call = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getNativeFormProps', this).call(this);

                var onValidate = _get$call.onValidate;
                var validator = _get$call.validator;
                var validate = _get$call.validate;
                var props = (0, _objectWithoutProperties3.default)(_get$call, ['onValidate', 'validator', 'validate']);


                return props;
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(_ref) {
                var _this2 = this;

                var model = _ref.model;
                var schema = _ref.schema;
                var validate = _ref.validate;
                var validator = _ref.validator;

                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'componentWillReceiveProps', this).apply(this, arguments);

                if (this.props.schema !== schema || this.props.validator !== validator) {
                    this.setState({
                        validator: this.getChildContextSchema().getValidator(validator)
                    }, function () {
                        if (validate === 'onChange' || validate === 'onChangeAfterSubmit' && _this2.state.validate) {
                            _this2.onValidate();
                        }
                    });
                } else if (!(0, _lodash4.default)(this.props.model, model)) {
                    if (validate === 'onChange' || validate === 'onChangeAfterSubmit' && this.state.validate) {
                        this.onValidateModel(model);
                    }
                }
            }
        }, {
            key: 'onChange',
            value: function onChange(key, value) {
                if (this.props.validate === 'onChange' || this.props.validate === 'onChangeAfterSubmit' && this.state.validate) {
                    this.onValidate(key, value);
                }

                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'onChange', this).apply(this, arguments);
            }
        }, {
            key: 'onReset',
            value: function onReset() {
                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'onReset', this).call(this);
                this.setState(function () {
                    return { error: null, validate: false };
                });
            }
        }, {
            key: 'onSubmit',
            value: function onSubmit(event) {
                var _this3 = this;

                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return new _promise2.default(function (resolve) {
                    return _this3.setState({ validate: true }, function () {
                        return resolve(_this3.onValidate().then(function () {
                            return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'onSubmit', _this3).call(_this3);
                        }));
                    });
                });
            }
        }, {
            key: 'onValidate',
            value: function onValidate(key, value) {
                var model = this.getModel();
                if (model && key) {
                    model = (0, _lodash6.default)((0, _lodash2.default)(model), key, (0, _lodash2.default)(value));
                }

                return this.onValidateModel(model);
            }
        }, {
            key: 'onValidateModel',
            value: function onValidateModel(model) {
                var _this4 = this;

                var catched = this.props.error || null;
                try {
                    this.state.validator(model);
                } catch (error) {
                    catched = error;
                }

                var markAndHandle = function markAndHandle() {
                    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : catched;
                    var resolve = arguments[1];
                    var reject = arguments[2];
                    return _this4.setState({ error: error }, function () {
                        if (error) {
                            error[__unhandledMark] = true;

                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                };

                return new _promise2.default(function (resolve, reject) {
                    return _this4.props.onValidate ? _this4.props.onValidate(model, catched, function (error) {
                        return markAndHandle(error, resolve, reject);
                    }) : markAndHandle(catched, resolve, reject);
                });
            }
        }]);
        return _class;
    }(parent), _class.Validated = Validated, _class.displayName = 'Validated' + parent.displayName, _class.defaultProps = (0, _extends3.default)({}, parent.defaultProps, {

        validate: 'onChangeAfterSubmit'
    }), _class.propTypes = (0, _extends3.default)({}, parent.propTypes, {

        onValidate: _react.PropTypes.func,

        validator: _react.PropTypes.any,
        validate: _react.PropTypes.oneOf(['onChange', 'onChangeAfterSubmit', 'onSubmit']).isRequired
    }), _temp;
};

exports.default = Validated(_BaseForm2.default);