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

var _ListAddField = require('./ListAddField');

var _ListAddField2 = _interopRequireDefault(_ListAddField);

var _ListItemField = require('./ListItemField');

var _ListItemField2 = _interopRequireDefault(_ListItemField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(_ref) {
    var children = _ref.children;
    var className = _ref.className;
    var disabled = _ref.disabled;
    var error = _ref.error;
    var initialCount = _ref.initialCount;
    var itemProps = _ref.itemProps;
    var label = _ref.label;
    var name = _ref.name;
    var required = _ref.required;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'className', 'disabled', 'error', 'initialCount', 'itemProps', 'label', 'name', 'required', 'value']);
    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('ui', className, { disabled: disabled }, 'grouped fitted fields list')
        }, (0, _uniforms.filterDOMProps)(props)),
        label && _react2.default.createElement(
            'section',
            { className: (0, _classnames2.default)({ error: error, required: required }, 'field item') },
            _react2.default.createElement(
                'label',
                { className: 'left floated' },
                label
            ),
            _react2.default.createElement(_ListAddField2.default, { name: name + '.$', initialCount: initialCount, className: 'right floated' })
        ),
        label && _react2.default.createElement('section', { className: 'ui fitted hidden clearing divider' }),
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