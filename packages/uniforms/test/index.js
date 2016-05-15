// custom assertions
import chai   from 'chai';
import enzyme from 'chai-enzyme';
import sinon  from 'sinon-chai';

chai.use(enzyme());
chai.use(sinon);

// DOM for React
import {jsdom} from 'jsdom';

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

// Mocks
import mock from 'mock-require';

global.Match = {
    OneOf () {},
    Optional () {},
    ObjectIncluding () {}
};

global.SimpleSchema = {
    extendOptions () {},
    _makeGeneric (name) {
        if (typeof name !== 'string') {
            return null;
        }

        return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
    }
};

mock('uniforms', '../src');
