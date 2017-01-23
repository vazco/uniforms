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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bootstrap3 = function Bootstrap3(parent) {
    var _class, _temp;

    return _temp = _class = function (_parent) {
        (0, _inherits3.default)(_class, _parent);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);
            return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
        }

        (0, _createClass3.default)(_class, [{
            key: 'getChildContextState',
            value: function getChildContextState() {
                return (0, _extends3.default)({}, (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getChildContextState', this).call(this), {
                    grid: this.props.grid
                });
            }
        }, {
            key: 'getNativeFormProps',
            value: function getNativeFormProps() {
                var error = this.getChildContextError();

                var _get$call = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getNativeFormProps', this).call(this);

                var className = _get$call.className;
                var grid = _get$call.grid;
                var props = (0, _objectWithoutProperties3.default)(_get$call, ['className', 'grid']);


                return (0, _extends3.default)({}, props, {
                    className: (0, _classnames2.default)('form', { error: error, 'form-horizontal': grid }, className)
                });
            }
        }]);
        return _class;
    }(parent), _class.Bootstrap3 = Bootstrap3, _class.displayName = 'Bootstrap3' + parent.displayName, _class.propTypes = (0, _extends3.default)({}, parent.propTypes, {

        grid: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object, _react.PropTypes.string])
    }), _temp;
};

exports.default = Bootstrap3(_uniforms.BaseForm);