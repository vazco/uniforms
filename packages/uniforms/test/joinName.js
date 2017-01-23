import {describe} from 'mocha';
import {expect}   from 'chai';
import {it}       from 'mocha';

import joinName from 'uniforms/joinName';

describe('joinName', () => {
    it('is a function', () => {
        expect(joinName).to.be.a('function');
    });

    it('have raw mode', () => {
        expect(joinName(null))                   .to.deep.equal([]);
        expect(joinName(null, 'a'))              .to.deep.equal(['a']);
        expect(joinName(null, 'a', 'b'))         .to.deep.equal(['a', 'b']);
        expect(joinName(null, 'a', 'b', null))   .to.deep.equal(['a', 'b']);
        expect(joinName(null, 'a', 'b', null, 1)).to.deep.equal(['a', 'b', '1']);
    });

    it('works with arrays', () => {
        expect(joinName(['a'], 'b')).to.equal('a.b');
        expect(joinName('a', ['b'])).to.equal('a.b');
    });

    it('works with empty strings', () => {
        expect(joinName('', 'a', 'b')).to.equal('a.b');
        expect(joinName('a', '', 'b')).to.equal('a.b');
        expect(joinName('a', 'b', '')).to.equal('a.b');
    });

    it('works with falsy values', () => {
        expect(joinName('a', null,      'b')).to.equal('a.b');
        expect(joinName('a', false,     'b')).to.equal('a.b');
        expect(joinName('a', undefined, 'b')).to.equal('a.b');
    });

    it('works with numbers', () => {
        expect(joinName(1, 'a', 'b')).to.equal('1.a.b');
        expect(joinName('a', 1, 'b')).to.equal('a.1.b');
        expect(joinName('a', 'b', 1)).to.equal('a.b.1');
    });

    it('works with partials', () => {
        expect(joinName('a', 'b.c.d')).to.equal('a.b.c.d');
        expect(joinName('a.b', 'c.d')).to.equal('a.b.c.d');
        expect(joinName('a.b.c', 'd')).to.equal('a.b.c.d');

        expect(joinName(null, 'a', 'b.c.d')).to.deep.equal(['a', 'b', 'c', 'd']);
        expect(joinName(null, 'a.b', 'c.d')).to.deep.equal(['a', 'b', 'c', 'd']);
        expect(joinName(null, 'a.b.c', 'd')).to.deep.equal(['a', 'b', 'c', 'd']);
    });
});
