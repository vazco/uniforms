'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomIds;
// Workaround for SSR
// https://github.com/vazco/uniforms/issues/40
// https://github.com/facebook/react/issues/4000
function randomIdsGenerator(prefix) {
    var counter = 0;

    return function () {
        return prefix + '-' + ('000' + (counter++).toString(36)).slice(-4);
    };
}

var randomIdPrefix = randomIdsGenerator('uniforms');

function randomIds() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : randomIdPrefix();

    return randomIdsGenerator(prefix);
}