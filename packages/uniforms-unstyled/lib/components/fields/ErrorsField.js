'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniforms = require('uniforms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorsField = function ErrorsField(_ref, _ref2) {
    var children = _ref.children;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children']);
    var _ref2$uniforms = _ref2.uniforms;
    var error = _ref2$uniforms.error;
    var schema = _ref2$uniforms.schema;
    return !error && !children ? _uniforms.nothing : _react2.default.createElement(
        'section',
        (0, _uniforms.filterDOMProps)(props),
        children,
        _react2.default.createElement(
            'ul',
            null,
            schema.getErrorMessages(error).map(function (message, index) {
                return _react2.default.createElement(
                    'li',
                    { key: index },
                    message
                );
            })
        )
    );
};

ErrorsField.contextTypes = _uniforms.BaseField.contextTypes;

exports.default = ErrorsField;