import {expect} from 'chai';

import {createSchemaBridge} from 'uniforms';

describe('createSchemaBridge', () => {
    it('is a function', () => {
        expect(createSchemaBridge).to.be.a('function');
    });

    it('throws on unrecognised schema', () => {
        expect(createSchemaBridge).to.throw(/Unrecognised schema: /);
    });
});
