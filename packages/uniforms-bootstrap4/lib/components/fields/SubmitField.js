'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uniforms = require('uniforms');

var _gridClassName = require('../../lib/gridClassName');

var _gridClassName2 = _interopRequireDefault(_gridClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitField = function SubmitField(_ref, _ref2) {
    var className = _ref.className;
    var inputClassName = _ref.inputClassName;
    var inputRef = _ref.inputRef;
    var value = _ref.value;
    var wrapClassName = _ref.wrapClassName;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'inputClassName', 'inputRef', 'value', 'wrapClassName']);
    var _ref2$uniforms = _ref2.uniforms;
    var error = _ref2$uniforms.error;
    var _ref2$uniforms$state = _ref2$uniforms.state;
    var disabled = _ref2$uniforms$state.disabled;
    var grid = _ref2$uniforms$state.grid;

    var hasWrap = !!(grid || wrapClassName);

    var blockInput = _react2.default.createElement('input', {
        className: inputClassName,
        disabled: !!(error || disabled),
        ref: inputRef,
        type: 'submit',
        value: value
    });

    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)(className, { 'has-danger': error, row: grid }) }, (0, _uniforms.filterDOMProps)(props)),
        hasWrap && _react2.default.createElement(
            'label',
            { className: (0, _classnames2.default)('form-control-label', (0, _gridClassName2.default)(grid, 'label')) },
            '\xA0'
        ),
        hasWrap && _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)(wrapClassName, (0, _gridClassName2.default)(grid, 'input')) },
            blockInput
        ),
        !hasWrap && blockInput
    );
};

SubmitField.contextTypes = _uniforms.BaseField.contextTypes;
SubmitField.defaultProps = {
    inputClassName: 'btn btn-primary'
};

exports.default = SubmitField;