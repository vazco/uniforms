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

var ListDel = function ListDel(_ref) {
    var className = _ref.className;
    var disabled = _ref.disabled;
    var name = _ref.name;
    var parent = _ref.parent;
    var removeIcon = _ref.removeIcon;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'disabled', 'name', 'parent', 'removeIcon']);

    var fieldIndex = +name.slice(1 + name.lastIndexOf('.'));
    var limitNotReached = !disabled && !(parent.minCount >= parent.value.length);

    return _react2.default.createElement(
        'span',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('label label-default label-pill', className),
            onClick: function onClick() {
                return limitNotReached && parent.onChange([].concat(parent.value.slice(0, fieldIndex)).concat(parent.value.slice(1 + fieldIndex)));
            }
        }, (0, _uniforms.filterDOMProps)(props)),
        removeIcon
    );
};

ListDel.defaultProps = {
    removeIcon: _react2.default.createElement('i', { className: 'octicon octicon-dash' })
};

exports.default = (0, _uniforms.connectField)(ListDel, { includeParent: true, initialValue: false });