import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';

import Bridge from 'uniforms/Bridge';

describe('Bridge', () => {
    class CustomBridge extends Bridge {}
    const customBridgeInstance = new CustomBridge();

    it('cannot be instantiated', () => {
        expect(() => new Bridge()).to.throw();
    });

    describe('#check', () => {
        it('throws an unimplemented error', () => {
            expect(Bridge.check).to.throw();
        });
    });

    [
        'getError',
        'getErrorMessage',
        'getErrorMessages',
        'getField',
        'getInitialValue',
        'getProps',
        'getSubfields',
        'getType',
        'getValidator'
    ].forEach(method => {
        describe(`#${method}`, () => {
            it('throws an unimplemented error', () => {
                expect(() => customBridgeInstance[method]()).to.throw();
            });
        });
    });
});
