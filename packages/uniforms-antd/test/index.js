// DOM for React
import {jsdom} from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = window.navigator;
Object.keys(window).forEach(property => {
    if (typeof global[property] === 'undefined') {
        global[property] = window[property];
    }
});

// Dirty fix for React
require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;

// Mocks
/*import mock from 'mock-require';

mock('uniforms', '../../uniforms/src');
mock('uniforms-antd', '../src');

*/

const Module = require('module');
const loader = Module._load;
Module._load = function _load (request, parent) {
    return loader(
        request
            .replace(/^uniforms-antd/, '../src')
            .replace(/^uniforms/, '../../uniforms/src'),
        parent
    );
};

if (typeof window !== 'undefined') {
    const matchMediaPolyfill = function matchMediaPolyfill (mediaQuery) {
        return {
            media: mediaQuery,
            matches: false,
            addListener: function addListener () {},
            removeListener: function removeListener () {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
