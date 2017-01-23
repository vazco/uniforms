'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniforms = require('uniforms');

var _AutoField = require('./AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

var _ListDelField = require('./ListDelField');

var _ListDelField2 = _interopRequireDefault(_ListDelField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = function ListItem(props) {
    return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(_ListDelField2.default, { name: props.name }),
        props.children ? _react.Children.map(props.children, function (child) {
            return _react2.default.cloneElement(child, {
                name: (0, _uniforms.joinName)(props.name, child.props.name),
                label: null
            });
        }) : _react2.default.createElement(_AutoField2.default, props)
    );
};

exports.default = (0, _uniforms.connectField)(ListItem, { includeInChain: false });