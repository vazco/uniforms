'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseForm = require('./BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _QuickForm = require('./QuickForm');

var _QuickForm2 = _interopRequireDefault(_QuickForm);

var _ValidatedForm = require('./ValidatedForm');

var _ValidatedForm2 = _interopRequireDefault(_ValidatedForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ValidatedForm2.default.Validated(_QuickForm2.default.Quick(_BaseForm2.default));