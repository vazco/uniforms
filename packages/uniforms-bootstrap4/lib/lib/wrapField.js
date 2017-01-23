'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wrapField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _gridClassName = require('./gridClassName');

var _gridClassName2 = _interopRequireDefault(_gridClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapField(_ref, children) {
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var errorMessage = _ref.errorMessage;
    var grid = _ref.grid;
    var help = _ref.help;
    var helpClassName = _ref.helpClassName;
    var id = _ref.id;
    var label = _ref.label;
    var required = _ref.required;
    var showInlineError = _ref.showInlineError;
    var wrapClassName = _ref.wrapClassName;

    var hasWrap = !!(grid || wrapClassName);

    var blockError = !!(errorMessage && showInlineError) && _react2.default.createElement(
        'span',
        { className: 'form-text text-danger' },
        errorMessage
    );

    var blockHelp = !!help && _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('form-text', helpClassName || 'text-muted') },
        help
    );

    return _react2.default.createElement(
        'section',
        {
            className: (0, _classnames2.default)(className, 'form-group', {
                'has-danger': error,
                disabled: disabled,
                required: required,
                row: grid
            })
        },
        label && _react2.default.createElement(
            'label',
            { htmlFor: id, className: (0, _classnames2.default)('form-control-label', (0, _gridClassName2.default)(grid, 'label')) },
            label
        ),
        hasWrap && _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)(wrapClassName, (0, _gridClassName2.default)(grid, 'input')) },
            children,
            blockHelp,
            blockError
        ),
        !hasWrap && children,
        !hasWrap && blockHelp,
        !hasWrap && blockError
    );
}