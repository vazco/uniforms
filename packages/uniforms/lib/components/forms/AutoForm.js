'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.set');

var _lodash6 = _interopRequireDefault(_lodash5);

var _react = require('react');

var _ValidatedQuickForm = require('./ValidatedQuickForm');

var _ValidatedQuickForm2 = _interopRequireDefault(_ValidatedQuickForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auto = function Auto(parent) {
    var _class, _temp;

    return _temp = _class = function (_parent) {
        (0, _inherits3.default)(_class, _parent);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);

            var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

            _this.state = (0, _extends3.default)({}, _this.state, {

                model: _this.props.model,
                modelSync: _this.props.model
            });
            return _this;
        }

        (0, _createClass3.default)(_class, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(_ref) {
                var model = _ref.model;

                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'componentWillReceiveProps', this).apply(this, arguments);

                if (!(0, _lodash4.default)(this.props.model, model)) {
                    this.setState({ model: model, modelSync: model });
                }
            }
        }, {
            key: 'getChildContextModel',
            value: function getChildContextModel() {
                return this.state.modelSync;
            }
        }, {
            key: 'getNativeFormProps',
            value: function getNativeFormProps() {
                var _get$call = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getNativeFormProps', this).call(this);

                var onChangeModel = _get$call.onChangeModel;
                var props = (0, _objectWithoutProperties3.default)(_get$call, ['onChangeModel']);


                return props;
            }
        }, {
            key: 'getModel',
            value: function getModel() {
                return this.state.model;
            }
        }, {
            key: 'onChange',
            value: function onChange(key, value) {
                var _this2 = this,
                    _arguments = arguments;

                this.setState(function (state) {
                    return { modelSync: (0, _lodash6.default)((0, _lodash2.default)(state.modelSync), key, value) };
                }, function () {
                    (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'onChange', _this2).apply(_this2, _arguments);
                    _this2.setState({ model: _this2.state.modelSync }, function () {
                        if (_this2.props.onChangeModel) {
                            _this2.props.onChangeModel(_this2.state.model);
                        }
                    });
                });
            }
        }, {
            key: 'onReset',
            value: function onReset() {
                (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'onReset', this).call(this);
                this.setState(function () {
                    return { model: {}, modelSync: {} };
                });
            }
        }, {
            key: 'onValidate',
            value: function onValidate() {
                return this.onValidateModel(this.getChildContextModel());
            }
        }]);
        return _class;
    }(parent), _class.Auto = Auto, _class.displayName = 'Auto' + parent.displayName, _class.propTypes = (0, _extends3.default)({}, parent.propTypes, {

        onChangeModel: _react.PropTypes.func
    }), _temp;
};

exports.default = Auto(_ValidatedQuickForm2.default);