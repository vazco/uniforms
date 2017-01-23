import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';

import createSchemaBridge from 'uniforms/createSchemaBridge';

describe('createSchemaBridge', () => {
    it('is a function', () => {
        expect(createSchemaBridge).to.be.a('function');
    });

    it('accepts a Bridge instance', () => {
        const bridge = {
            getError () {},
            getErrorMessage () {},
            getErrorMessages () {},
            getField () {},
            getInitialValue () {},
            getProps () {},
            getSubfields () {},
            getType () {},
            getValidator () {}
        };

        expect(createSchemaBridge(bridge)).to.be.equal(bridge);
    });

    it('throws on unrecognised schema', () => {
        expect(createSchemaBridge).to.throw(/Unrecognised schema: /);
    });
});
