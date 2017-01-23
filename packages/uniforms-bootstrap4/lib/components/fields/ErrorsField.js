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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorsField = function ErrorsField(_ref, _ref2) {
    var className = _ref.className;
    var children = _ref.children;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'children']);
    var _ref2$uniforms = _ref2.uniforms;
    var error = _ref2$uniforms.error;
    var schema = _ref2$uniforms.schema;
    return !error && !children ? _uniforms.nothing : _react2.default.createElement(
        'section',
        (0, _extends3.default)({ className: (0, _classnames2.default)('card', className) }, (0, _uniforms.filterDOMProps)(props)),
        _react2.default.createElement(
            'section',
            { className: 'card-block' },
            children,
            schema.getErrorMessages(error).map(function (message, index) {
                return _react2.default.createElement(
                    'section',
                    { key: index, className: 'disabled' },
                    message
                );
            })
        )
    );
};

ErrorsField.contextTypes = _uniforms.BaseField.contextTypes;

exports.default = ErrorsField;