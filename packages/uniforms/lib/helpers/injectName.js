'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = injectName;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _joinName = require('./joinName');

var _joinName2 = _interopRequireDefault(_joinName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function injectName(name, children, parent) {
    return _react.Children.map(children, function (child) {
        return child && typeof child !== 'string' && (!parent || !parent.props || !parent.props.name) ? !child.props ? _react2.default.cloneElement(child, { name: name }) : _react2.default.cloneElement(child, {
            name: (0, _joinName2.default)(name, child.props.name),
            children: injectName(name, child.props.children, child)
        }) : child;
    });
}