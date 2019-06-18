// @flow

import changedKeys from 'uniforms/changedKeys';

describe('changedKeys', () => {
  it('is a function', () => {
    expect(changedKeys).toBeInstanceOf(Function);
  });

  describe('(==)', () => {
    it('works with arrays', () => {
      expect(changedKeys('a', [], [])).toEqual([]);
      expect(changedKeys('a', [1], [1])).toEqual([]);
      expect(changedKeys('a', [1, 2], [1, 2])).toEqual([]);
    });

    it('works with dates', () => {
      expect(changedKeys('a', new Date(10), new Date(10))).toEqual([]);
      expect(changedKeys('a', new Date(20), new Date(20))).toEqual([]);
      expect(changedKeys('a', new Date(30), new Date(30))).toEqual([]);
    });

    it('works with objects', () => {
      expect(changedKeys('a', {}, {})).toEqual([]);
      expect(changedKeys('a', { a: 1 }, { a: 1 })).toEqual([]);
      expect(changedKeys('a', { a: 1, b: 2 }, { a: 1, b: 2 })).toEqual([]);
    });

    it('works with primitives', () => {
      expect(changedKeys('a', 1, 1)).toEqual([]);
      expect(changedKeys('a', null, null)).toEqual([]);
      expect(changedKeys('a', true, true)).toEqual([]);
      expect(changedKeys('a', 'no', 'no')).toEqual([]);
    });
  });

  describe('(++)', () => {
    it('works with arrays', () => {
      expect(changedKeys('a', [], [1])).toEqual(['a', 'a.0']);
      expect(changedKeys('a', [1], [1, 2])).toEqual(['a', 'a.1']);
      expect(changedKeys('a', [1, 2], [1, 2, 3])).toEqual(['a', 'a.2']);
    });

    it('works with dates', () => {
      expect(changedKeys('a', new Date(10), new Date(20))).toEqual(['a']);
      expect(changedKeys('a', new Date(20), new Date(30))).toEqual(['a']);
      expect(changedKeys('a', new Date(30), new Date(40))).toEqual(['a']);
    });

    it('works with objects', () => {
      expect(changedKeys('a', {}, { a: 1 })).toEqual(['a', 'a.a']);
      expect(changedKeys('a', { a: 1 }, { a: 1, b: 2 })).toEqual(['a', 'a.b']);
      expect(changedKeys('a', { a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual([
        'a',
        'a.c'
      ]);
    });

    it('works with primitives', () => {
      expect(changedKeys('a', 1, 2)).toEqual(['a']);
      expect(changedKeys('a', null, true)).toEqual(['a']);
      expect(changedKeys('a', true, null)).toEqual(['a']);
      expect(changedKeys('a', 'no', 'pe')).toEqual(['a']);
    });
  });

  describe('(--)', () => {
    it('works with arrays', () => {
      expect(changedKeys('a', [1])).toEqual(['a', 'a.0']);
      expect(changedKeys('a', [1], [])).toEqual(['a', 'a.0']);
      expect(changedKeys('a', [1, 2], [1])).toEqual(['a', 'a.1']);
      expect(changedKeys('a', [1, 2, 3], [1, 2])).toEqual(['a', 'a.2']);
    });

    it('works with dates', () => {
      expect(changedKeys('a', new Date(20))).toEqual(['a']);
      expect(changedKeys('a', new Date(20), new Date(10))).toEqual(['a']);
      expect(changedKeys('a', new Date(30), new Date(20))).toEqual(['a']);
      expect(changedKeys('a', new Date(40), new Date(30))).toEqual(['a']);
    });

    it('works with objects', () => {
      expect(changedKeys('a', { a: 1 })).toEqual(['a', 'a.a']);
      expect(changedKeys('a', { a: 1 }, {})).toEqual(['a', 'a.a']);
      expect(changedKeys('a', { a: 1, b: 2 }, { a: 1 })).toEqual(['a', 'a.b']);
      expect(changedKeys('a', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual([
        'a',
        'a.c'
      ]);
    });

    it('works with primitives', () => {
      expect(changedKeys('a', 2)).toEqual(['a']);
      expect(changedKeys('a', 2, 1)).toEqual(['a']);
      expect(changedKeys('a', true, null)).toEqual(['a']);
      expect(changedKeys('a', null, true)).toEqual(['a']);
      expect(changedKeys('a', 'pe', 'no')).toEqual(['a']);
    });
  });
});
