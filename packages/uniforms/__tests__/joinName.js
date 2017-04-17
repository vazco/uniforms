import joinName from 'uniforms/joinName';

describe('joinName', () => {
    it('is a function', () => {
        expect(joinName).toBeInstanceOf(Function);
    });

    it('have raw mode', () => {
        expect(joinName(null))                   .toEqual([]);
        expect(joinName(null, 'a'))              .toEqual(['a']);
        expect(joinName(null, 'a', 'b'))         .toEqual(['a', 'b']);
        expect(joinName(null, 'a', 'b', null))   .toEqual(['a', 'b']);
        expect(joinName(null, 'a', 'b', null, 1)).toEqual(['a', 'b', '1']);
    });

    it('works with arrays', () => {
        expect(joinName(['a'], 'b')).toEqual('a.b');
        expect(joinName('a', ['b'])).toEqual('a.b');
    });

    it('works with empty strings', () => {
        expect(joinName('', 'a', 'b')).toEqual('a.b');
        expect(joinName('a', '', 'b')).toEqual('a.b');
        expect(joinName('a', 'b', '')).toEqual('a.b');
    });

    it('works with falsy values', () => {
        expect(joinName('a', null,      'b')).toEqual('a.b');
        expect(joinName('a', false,     'b')).toEqual('a.b');
        expect(joinName('a', undefined, 'b')).toEqual('a.b');
    });

    it('works with numbers', () => {
        expect(joinName(1, 'a', 'b')).toEqual('1.a.b');
        expect(joinName('a', 1, 'b')).toEqual('a.1.b');
        expect(joinName('a', 'b', 1)).toEqual('a.b.1');
    });

    it('works with partials', () => {
        expect(joinName('a', 'b.c.d')).toEqual('a.b.c.d');
        expect(joinName('a.b', 'c.d')).toEqual('a.b.c.d');
        expect(joinName('a.b.c', 'd')).toEqual('a.b.c.d');

        expect(joinName(null, 'a', 'b.c.d')).toEqual(['a', 'b', 'c', 'd']);
        expect(joinName(null, 'a.b', 'c.d')).toEqual(['a', 'b', 'c', 'd']);
        expect(joinName(null, 'a.b.c', 'd')).toEqual(['a', 'b', 'c', 'd']);
    });
});
