'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
        { className: 'row' },
        _react2.default.createElement(
            'section',
            { className: 'col-xs-1' },
            _react2.default.createElement(_ListDelField2.default, { name: props.name, removeIcon: props.removeIcon })
        ),
        props.children ? _react.Children.map(props.children, function (child) {
            return _react2.default.cloneElement(child, {
                className: 'col-xs-11',
                name: (0, _uniforms.joinName)(props.name, child.props.name),
                label: null
            });
        }) : _react2.default.createElement(_AutoField2.default, (0, _extends3.default)({}, props, { className: 'col-xs-11' }))
    );
};

exports.default = (0, _uniforms.connectField)(ListItem, { includeInChain: false });