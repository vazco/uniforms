'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = filterDOMProps;
// These props are provided by BaseField
var unwantedProps = ['changed', 'changedMap', 'disabled', 'error', 'errorMessage', 'field', 'fieldType', 'fields', 'findError', 'findField', 'findValue', 'initialCount', 'label', 'name', 'onChange', 'parent', 'placeholder', 'value'];

// Some benchmarks
// https://albertxing.com/stool/#bb5cbc0441ad7ac47602694f6c7183b4
function filterDOMProps(props) {
    var filteredProps = {};

    for (var prop in props) {
        if (unwantedProps.indexOf(prop) === -1) {
            filteredProps[prop] = props[prop];
        }
    }

    return filteredProps;
}

// Bridges have to register additional props
filterDOMProps.register = function () {
    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
        props[_key] = arguments[_key];
    }

    props.forEach(function (prop) {
        if (unwantedProps.indexOf(prop) === -1) {
            unwantedProps.push(prop);
        }
    });
};

// It might be handy at some point
filterDOMProps.registered = unwantedProps;