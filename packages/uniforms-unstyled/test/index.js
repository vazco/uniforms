// DOM for React
import {jsdom} from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;

global.HTMLElement = window.HTMLElement;
global.navigator   = window.navigator;

// Mocks
const Module = require('module');
const loader = Module._load;
Module._load = function _load (request, parent) {
    return loader(
        request
            .replace(/^uniforms-unstyled/, '../src')
            .replace(/^uniforms/, '../../uniforms/src'),
        parent
    );
};
