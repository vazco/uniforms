import {expect} from 'chai';

import changedKeys from 'uniforms/changedKeys';

describe('changedKeys', () => {
    it('is a function', () => {
        expect(changedKeys).to.be.a('function');
    });

    describe('(==)', () => {
        it('works with arrays', () => {
            expect(changedKeys('a', [], [])).to.deep.equal([]);
            expect(changedKeys('a', [1], [1])).to.deep.equal([]);
            expect(changedKeys('a', [1, 2], [1, 2])).to.deep.equal([]);
        });

        it('works with dates', () => {
            expect(changedKeys('a', new Date(10), new Date(10))).to.deep.equal([]);
            expect(changedKeys('a', new Date(20), new Date(20))).to.deep.equal([]);
            expect(changedKeys('a', new Date(30), new Date(30))).to.deep.equal([]);
        });

        it('works with objects', () => {
            expect(changedKeys('a', {}, {})).to.deep.equal([]);
            expect(changedKeys('a', {a: 1}, {a: 1})).to.deep.equal([]);
            expect(changedKeys('a', {a: 1, b: 2}, {a: 1, b: 2})).to.deep.equal([]);
        });

        it('works with primitives', () => {
            expect(changedKeys('a', 1, 1)).to.deep.equal([]);
            expect(changedKeys('a', null, null)).to.deep.equal([]);
            expect(changedKeys('a', true, true)).to.deep.equal([]);
            expect(changedKeys('a', 'no', 'no')).to.deep.equal([]);
        });
    });

    describe('(++)', () => {
        it('works with arrays', () => {
            expect(changedKeys('a', [], [1])).to.deep.equal(['a', 'a.0']);
            expect(changedKeys('a', [1], [1, 2])).to.deep.equal(['a', 'a.1']);
            expect(changedKeys('a', [1, 2], [1, 2, 3])).to.deep.equal(['a', 'a.2']);
        });

        it('works with dates', () => {
            expect(changedKeys('a', new Date(10), new Date(20))).to.deep.equal(['a']);
            expect(changedKeys('a', new Date(20), new Date(30))).to.deep.equal(['a']);
            expect(changedKeys('a', new Date(30), new Date(40))).to.deep.equal(['a']);
        });

        it('works with objects', () => {
            expect(changedKeys('a', {}, {a: 1})).to.deep.equal(['a', 'a.a']);
            expect(changedKeys('a', {a: 1}, {a: 1, b: 2})).to.deep.equal(['a', 'a.b']);
            expect(changedKeys('a', {a: 1, b: 2}, {a: 1, b: 2, c: 3})).to.deep.equal(['a', 'a.c']);
        });

        it('works with primitives', () => {
            expect(changedKeys('a', 1, 2)).to.deep.equal(['a']);
            expect(changedKeys('a', null, true)).to.deep.equal(['a']);
            expect(changedKeys('a', true, null)).to.deep.equal(['a']);
            expect(changedKeys('a', 'no', 'pe')).to.deep.equal(['a']);
        });
    });

    describe('(--)', () => {
        it('works with arrays', () => {
            expect(changedKeys('a', [1])).to.deep.equal(['a', 'a.0']);
            expect(changedKeys('a', [1], [])).to.deep.equal(['a', 'a.0']);
            expect(changedKeys('a', [1, 2], [1])).to.deep.equal(['a', 'a.1']);
            expect(changedKeys('a', [1, 2, 3], [1, 2])).to.deep.equal(['a', 'a.2']);
        });

        it('works with dates', () => {
            expect(changedKeys('a', new Date(20))).to.deep.equal(['a']);
            expect(changedKeys('a', new Date(20), new Date(10))).to.deep.equal(['a']);
            expect(changedKeys('a', new Date(30), new Date(20))).to.deep.equal(['a']);
            expect(changedKeys('a', new Date(40), new Date(30))).to.deep.equal(['a']);
        });

        it('works with objects', () => {
            expect(changedKeys('a', {a: 1})).to.deep.equal(['a', 'a.a']);
            expect(changedKeys('a', {a: 1}, {})).to.deep.equal(['a', 'a.a']);
            expect(changedKeys('a', {a: 1, b: 2}, {a: 1})).to.deep.equal(['a', 'a.b']);
            expect(changedKeys('a', {a: 1, b: 2, c: 3}, {a: 1, b: 2})).to.deep.equal(['a', 'a.c']);
        });

        it('works with primitives', () => {
            expect(changedKeys('a', 2)).to.deep.equal(['a']);
            expect(changedKeys('a', 2, 1)).to.deep.equal(['a']);
            expect(changedKeys('a', true, null)).to.deep.equal(['a']);
            expect(changedKeys('a', null, true)).to.deep.equal(['a']);
            expect(changedKeys('a', 'pe', 'no')).to.deep.equal(['a']);
        });
    });
});
