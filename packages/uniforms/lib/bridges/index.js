'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createSchemaBridge;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Bridge = require('./Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _SimpleSchemaBridge = require('./SimpleSchemaBridge');

var _SimpleSchemaBridge2 = _interopRequireDefault(_SimpleSchemaBridge);

var _SimpleSchema2Bridge = require('./SimpleSchema2Bridge');

var _SimpleSchema2Bridge2 = _interopRequireDefault(_SimpleSchema2Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bridges = [_Bridge2.default, _SimpleSchemaBridge2.default, _SimpleSchema2Bridge2.default];

function createSchemaBridge(schema) {
    var Bridge = bridges.find(function (bridge) {
        return bridge.check(schema);
    });

    (0, _invariant2.default)(Bridge, 'Unrecognised schema: %s', schema);

    return new Bridge(schema);
}