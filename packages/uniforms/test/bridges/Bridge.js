import {expect} from 'chai';

import {Bridge} from 'uniforms';

describe('Bridge', () => {
    const id = x => () => x;
    const schema = {
        getError:         id('getError'),
        getErrorMessage:  id('getErrorMessage'),
        getErrorMessages: id('getErrorMessages'),
        getField:         id('getField'),
        getInitialValue:  id('getInitialValue'),
        getProps:         id('getProps'),
        getSubfields:     id('getSubfields'),
        getType:          id('getType'),
        getValidator:     id('getValidator')
    };

    const bridge = new Bridge(schema);

    context('#check()', () => {
        it('works correctly without schema', () => {
            expect(Bridge.check()).to.be.falsy;
        });

        Object.keys(schema).forEach(method => {
            it(`works correctly without '${method}'`, () => {
                expect(Bridge.check({...schema, [method]: null})).to.be.falsy;
            });
        });
    });

    Object.keys(schema).forEach(method => {
        context(`#${method}`, () => {
            it('is a flyweight', () => {
                expect(bridge[method]()).to.be.equal(method);
            });
        });
    });
});
