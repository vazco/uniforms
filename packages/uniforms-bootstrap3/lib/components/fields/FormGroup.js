'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _gridClassName = require('../../lib/gridClassName');

var _gridClassName2 = _interopRequireDefault(_gridClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeHelp = function makeHelp(help, helpClassName) {
    return !!help && _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('help-block', helpClassName || 'text-muted') },
        help
    );
};

var FormGroup = function FormGroup(_ref) {
    var children = _ref.children;
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var errorMessage = _ref.errorMessage;
    var feedbackable = _ref.feedbackable;
    var grid = _ref.grid;
    var help = _ref.help;
    var helpClassName = _ref.helpClassName;
    var id = _ref.id;
    var label = _ref.label;
    var required = _ref.required;
    var wrapClassName = _ref.wrapClassName;
    var showInlineError = _ref.showInlineError;
    return _react2.default.createElement(
        'section',
        {
            className: (0, _classnames2.default)(className, 'field', 'form-group', {
                'has-feedback': error && feedbackable,
                'has-error': error,
                disabled: disabled,
                required: required
            })
        },
        label && _react2.default.createElement(
            'label',
            { htmlFor: id, className: (0, _classnames2.default)('control-label', (0, _gridClassName2.default)(grid, 'label')) },
            label
        ),
        (grid || wrapClassName) && _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)(wrapClassName, (0, _gridClassName2.default)(grid, 'input')) },
            children,
            makeHelp(help, helpClassName),
            errorMessage && showInlineError && makeHelp(errorMessage, 'text-help-error')
        ),
        !grid && !wrapClassName && children,
        !grid && !wrapClassName && makeHelp(help, helpClassName),
        !grid && !wrapClassName && errorMessage && showInlineError && makeHelp(errorMessage, 'text-help-error')
    );
};

exports.default = FormGroup;