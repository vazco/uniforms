// custom assertions
import chai   from 'chai';
import enzyme from 'chai-enzyme';
import sinon  from 'sinon-chai';

chai.use(enzyme());
chai.use(sinon);

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
import mock from 'mock-require';

mock('uniforms-bootstrap3', '../src');
