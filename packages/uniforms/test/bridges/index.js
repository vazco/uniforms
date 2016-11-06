import {expect} from 'chai';

import {createSchemaBridge} from 'uniforms';

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
