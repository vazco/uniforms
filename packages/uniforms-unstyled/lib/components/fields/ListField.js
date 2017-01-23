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

var _uniforms = require('uniforms');

var _ListAddField = require('./ListAddField');

var _ListAddField2 = _interopRequireDefault(_ListAddField);

var _ListItemField = require('./ListItemField');

var _ListItemField2 = _interopRequireDefault(_ListItemField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(_ref) {
    var children = _ref.children;
    var initialCount = _ref.initialCount;
    var itemProps = _ref.itemProps;
    var label = _ref.label;
    var name = _ref.name;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'initialCount', 'itemProps', 'label', 'name', 'value']);
    return _react2.default.createElement(
        'ul',
        (0, _uniforms.filterDOMProps)(props),
        label && _react2.default.createElement(
            'label',
            null,
            label,
            _react2.default.createElement(_ListAddField2.default, { name: name + '.$', initialCount: initialCount })
        ),
        children ? value.map(function (item, index) {
            return _react.Children.map(children, function (child) {
                return _react2.default.cloneElement(child, {
                    key: index,
                    label: null,
                    name: (0, _uniforms.joinName)(name, child.props.name && child.props.name.replace('$', index))
                });
            });
        }) : value.map(function (item, index) {
            return _react2.default.createElement(_ListItemField2.default, (0, _extends3.default)({ key: index, label: null, name: (0, _uniforms.joinName)(name, index) }, itemProps));
        })
    );
};

exports.default = (0, _uniforms.connectField)(List, { includeInChain: false });