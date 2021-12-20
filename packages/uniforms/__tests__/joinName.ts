import { joinName } from 'uniforms';

describe('joinName', () => {
  it('is a function', () => {
    expect(joinName).toBeInstanceOf(Function);
  });

  it('have raw mode', () => {
    expect(joinName(null)).toEqual([]);
    expect(joinName(null, 'a')).toEqual(['a']);
    expect(joinName(null, 'a', 'b')).toEqual(['a', 'b']);
    expect(joinName(null, 'a', 'b', null)).toEqual(['a', 'b']);
    expect(joinName(null, 'a', 'b', null, 0)).toEqual(['a', 'b', '0']);
    expect(joinName(null, 'a', 'b', null, 1)).toEqual(['a', 'b', '1']);
  });

  it('works with arrays', () => {
    expect(joinName(['a'], 'b')).toBe('a.b');
    expect(joinName('a', ['b'])).toBe('a.b');
  });

  it('works with empty strings', () => {
    expect(joinName('', 'a', 'b')).toBe('a.b');
    expect(joinName('a', '', 'b')).toBe('a.b');
    expect(joinName('a', 'b', '')).toBe('a.b');
  });

  it('works with falsy values', () => {
    expect(joinName('a', null, 'b')).toBe('a.b');
    expect(joinName('a', false, 'b')).toBe('a.b');
    expect(joinName('a', undefined, 'b')).toBe('a.b');
  });

  it('works with numbers', () => {
    expect(joinName(0, 'a', 'b')).toBe('0.a.b');
    expect(joinName('a', 0, 'b')).toBe('a.0.b');
    expect(joinName('a', 'b', 0)).toBe('a.b.0');
    expect(joinName(1, 'a', 'b')).toBe('1.a.b');
    expect(joinName('a', 1, 'b')).toBe('a.1.b');
    expect(joinName('a', 'b', 1)).toBe('a.b.1');
  });

  it('works with partials', () => {
    expect(joinName('a', 'b.c.d')).toBe('a.b.c.d');
    expect(joinName('a.b', 'c.d')).toBe('a.b.c.d');
    expect(joinName('a.b.c', 'd')).toBe('a.b.c.d');

    expect(joinName(null, 'a', 'b.c.d')).toEqual(['a', 'b', 'c', 'd']);
    expect(joinName(null, 'a.b', 'c.d')).toEqual(['a', 'b', 'c', 'd']);
    expect(joinName(null, 'a.b.c', 'd')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('works with dot-names', () => {
    expect(joinName('a', 'b.c')).toBe('a.b.c');
    expect(joinName('a', '["b.c"]')).toBe('a.["b.c"]');

    expect(joinName(null, 'a', 'b.c')).toMatchObject(['a', 'b', 'c']);
    expect(joinName(null, 'a', '["b.c"]')).toMatchObject(['a', '["b.c"]']);
  });
});
