"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = function () {
    function Bridge(schema) {
        (0, _classCallCheck3.default)(this, Bridge);

        this.schema = schema;
    }

    // Check, if this bridge is compatibile with given schema


    (0, _createClass3.default)(Bridge, [{
        key: "getError",


        // Field's scoped error
        value: function getError(name, error) {
            return this.schema.getError(name, error);
        }

        // Field's scoped error message

    }, {
        key: "getErrorMessage",
        value: function getErrorMessage(name, error) {
            return this.schema.getErrorMessage(name, error);
        }

        // All error messages from error

    }, {
        key: "getErrorMessages",
        value: function getErrorMessages(error) {
            return this.schema.getErrorMessages(error);
        }

        // Field's definition (`field` prop)

    }, {
        key: "getField",
        value: function getField(name) {
            return this.schema.getField(name);
        }

        // Field's initial value

    }, {
        key: "getInitialValue",
        value: function getInitialValue(name, props) {
            return this.schema.getInitialValue(name, props);
        }

        // Field's props

    }, {
        key: "getProps",
        value: function getProps(name, props) {
            return this.schema.getProps(name, props);
        }

        // Field's subfields (or first-level fields)

    }, {
        key: "getSubfields",
        value: function getSubfields(name) {
            return this.schema.getSubfields(name);
        }

        // Field's type (ex. Number, String)

    }, {
        key: "getType",
        value: function getType(name) {
            return this.schema.getType(name);
        }

        // Function with one argument - model - which throws errors
        // when model is invalid

    }, {
        key: "getValidator",
        value: function getValidator(options) {
            return this.schema.getValidator(options);
        }
    }], [{
        key: "check",
        value: function check(schema) {
            return schema && schema.getError && schema.getErrorMessage && schema.getErrorMessages && schema.getField && schema.getInitialValue && schema.getProps && schema.getSubfields && schema.getType && schema.getValidator;
        }
    }]);
    return Bridge;
}();

exports.default = Bridge;