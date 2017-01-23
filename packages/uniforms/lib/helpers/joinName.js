'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = joinName;
function joinName() {
    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
    }

    var name = names.filter(function (name) {
        return name || name === 0;
    }).map(function (name) {
        return name.split ? name.split('.') : name;
    }).reduce(function (names, name) {
        return names.concat(name);
    }, []).map(function (name) {
        return name.toString();
    });

    return names[0] === null ? name : name.join('.');
}