import {expect} from 'chai';

import {Bridge} from 'uniforms';

describe('Bridge', () => {
    class CustomBridge extends Bridge {}
    const customBridgeInstance = new CustomBridge();

    it('cannot be instantiated', () => {
        expect(() => new Bridge()).to.throw();
    });

    context('#check', () => {
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
        context(`#${method}`, () => {
            it('throws an unimplemented error', () => {
                expect(() => customBridgeInstance[method]()).to.throw();
            });
        });
    });
});
