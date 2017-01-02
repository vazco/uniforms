import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';

import randomIds from 'uniforms/randomIds';

describe('randomIds', () => {
    it('is a function', () => {
        expect(randomIds).to.be.a('function');
    });

    it('returns a function', () => {
        expect(randomIds).to.be.a('function');
    });

    it('generate random id', () => {
        const amount = 100;

        const generator = randomIds();
        const generated = [...Array(amount)].map(generator);

        const unique = generated.filter((a, b, c) => c.indexOf(a) === b);

        expect(unique).to.have.length(amount);
    });
});
