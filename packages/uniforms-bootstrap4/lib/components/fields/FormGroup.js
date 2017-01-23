'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _wrapField = require('../../lib/wrapField');

var _wrapField2 = _interopRequireDefault(_wrapField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormGroup = function FormGroup(_ref) {
    var children = _ref.children;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children']);

    (0, _warning2.default)(false, 'FormGroup is deprecated and will be removed in the next release.');

    return (0, _wrapField2.default)(props, children);
};

exports.default = FormGroup;