'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _uniforms = require('uniforms');

var _BaseForm = require('./BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _AutoField = require('../fields/AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

var _ErrorsField = require('../fields/ErrorsField');

var _ErrorsField2 = _interopRequireDefault(_ErrorsField);

var _SubmitField = require('../fields/SubmitField');

var _SubmitField2 = _interopRequireDefault(_SubmitField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quick = function Quick(parent) {
    var _class, _temp;

    return _temp = _class = function (_QuickForm$Quick) {
        (0, _inherits3.default)(_class, _QuickForm$Quick);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);
            return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
        }

        (0, _createClass3.default)(_class, [{
            key: 'getAutoField',
            value: function getAutoField() {
                return _AutoField2.default;
            }
        }, {
            key: 'getErrorsField',
            value: function getErrorsField() {
                return _ErrorsField2.default;
            }
        }, {
            key: 'getSubmitField',
            value: function getSubmitField() {
                return _SubmitField2.default;
            }
        }]);
        return _class;
    }(_uniforms.QuickForm.Quick(parent)), _class.Quick = Quick, _temp;
};

exports.default = Quick(_BaseForm2.default);