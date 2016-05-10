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

// Meteor mocks
import mock from 'mock-require';

mock('meteor/check', {
    Match: {
        OneOf () {},
        Optional () {},
        ObjectIncluding () {}
    }
});

mock('meteor/aldeed:simple-schema', {
    SimpleSchema: {
        extendOptions () {},
        _makeGeneric (name) {
            return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
        }
    }
});

mock('uniforms', '../src');
