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

var ListAdd = function ListAdd(_ref) {
    var addIcon = _ref.addIcon;
    var className = _ref.className;
    var disabled = _ref.disabled;
    var parent = _ref.parent;
    var value = _ref.value;
    var props = (0, _objectWithoutProperties3.default)(_ref, ['addIcon', 'className', 'disabled', 'parent', 'value']);

    var limitNotReached = !disabled && !(parent.maxCount <= parent.value.length);

    return _react2.default.createElement(
        'section',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('label label-default label-pill float-xs-right', className),
            onClick: function onClick() {
                return limitNotReached && parent.onChange(parent.value.concat([value]));
            }
        }, (0, _uniforms.filterDOMProps)(props)),
        addIcon
    );
};

ListAdd.defaultProps = {
    addIcon: _react2.default.createElement('i', { className: 'octicon octicon-plus' })
};

exports.default = (0, _uniforms.connectField)(ListAdd, { includeParent: true, initialValue: false });