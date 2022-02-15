import { joinName } from 'uniforms';

function test(parts: unknown[], array: string[], string: string) {
  // Serialization (join).
  expect(joinName(...parts)).toBe(string);

  // Deserialization (split).
  expect(joinName(null, ...parts)).toEqual(array);

  // Re-serialization (split + join).
  expect(joinName(joinName(null, ...parts))).toEqual(string);

  // Re-deserialization (join + split).
  expect(joinName(null, joinName(...parts))).toEqual(array);
}

describe('joinName', () => {
  it('is a function', () => {
    expect(joinName).toBeInstanceOf(Function);
  });

  it('works with empty name', () => {
    test([], [], '');
  });

  it('works with arrays', () => {
    test([['a']], ['a'], 'a');
    test([[['a']]], ['a'], 'a');
    test([[[['a']]]], ['a'], 'a');

    test([[], 'a'], ['a'], 'a');
    test(['a', []], ['a'], 'a');

    test([['a'], 'b'], ['a', 'b'], 'a.b');
    test(['a', ['b']], ['a', 'b'], 'a.b');

    test([['a', 'b'], 'c'], ['a', 'b', 'c'], 'a.b.c');
    test(['a', ['b', 'c']], ['a', 'b', 'c'], 'a.b.c');

    test(['a', ['b', 'c'], 'd'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
  });

  it('works with empty strings', () => {
    test(['', 'a', 'b'], ['a', 'b'], 'a.b');
    test(['a', '', 'b'], ['a', 'b'], 'a.b');
    test(['a', 'b', ''], ['a', 'b'], 'a.b');
  });

  it('works with falsy values', () => {
    test(['a', null, 'b'], ['a', 'b'], 'a.b');
    test(['a', false, 'b'], ['a', 'b'], 'a.b');
    test(['a', undefined, 'b'], ['a', 'b'], 'a.b');
  });

  it('works with numbers', () => {
    test([0, 'a', 'b'], ['0', 'a', 'b'], '0.a.b');
    test(['a', 0, 'b'], ['a', '0', 'b'], 'a.0.b');
    test(['a', 'b', 0], ['a', 'b', '0'], 'a.b.0');
    test([1, 'a', 'b'], ['1', 'a', 'b'], '1.a.b');
    test(['a', 1, 'b'], ['a', '1', 'b'], 'a.1.b');
    test(['a', 'b', 1], ['a', 'b', '1'], 'a.b.1');
  });

  it('works with partials', () => {
    test(['a', 'b.c.d'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    test(['a.b', 'c.d'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    test(['a.b.c', 'd'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
  });

  it('works with subscripts', () => {
    test(['a["b"]'], ['a', 'b'], 'a.b');
    test(['a["b"].c'], ['a', 'b', 'c'], 'a.b.c');
    test(['a["b"].c["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    test(['a["b"]["c.d"]'], ['a', 'b', '["c.d"]'], 'a.b["c.d"]');
    test(['a["b"]["c.d"].e'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    test(['a["b"]["c.d"]["e"]'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    test(['a["b"].["c.d"]'], ['a', 'b', '["c.d"]'], 'a.b["c.d"]');
    test(['a["b"].["c.d"].e'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    test(['a["b"].["c.d"]["e"]'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');

    test(['["a"]'], ['a'], 'a');
    test(['["a"].b'], ['a', 'b'], 'a.b');
    test(['["a"]["b.c"]'], ['a', '["b.c"]'], 'a["b.c"]');
    test(['["a"]["b.c"].d'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    test(['["a"]["b.c"]["d"]'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    test(['["a"].["b.c"]'], ['a', '["b.c"]'], 'a["b.c"]');
    test(['["a"].["b.c"].d'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    test(['["a"].["b.c"]["d"]'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');

    test(['[""]'], ['[""]'], '[""]');
    test(['["."]'], ['["."]'], '["."]');
    test(['[".."]'], ['[".."]'], '[".."]');
    test(['["..."]'], ['["..."]'], '["..."]');
    test(['["[\'\']"]'], ['["[\'\']"]'], '["[\'\']"]');
    test(['["[\\"\\"]"]'], ['["[\\"\\"]"]'], '["[\\"\\"]"]');
  });

  it('handles incorrect cases _somehow_', () => {
    // Boolean `true`.
    test([true], ['true'], 'true');
    test([true, 'a'], ['true', 'a'], 'true.a');
    test(['a', true], ['a', 'true'], 'a.true');

    // Dots before subscripts.
    test(['a["b"].c.["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    test(['a.["b"].c["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    test(['a.["b"].c.["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');

    // Only dots.
    test(['.'], ['["."]'], '["."]');
    test(['..'], ['[".."]'], '[".."]');
    test(['...'], ['["..."]'], '["..."]');

    // Leading and trailing dots.
    test(['a.'], ['["a."]'], '["a."]');
    test(['.a'], ['[""]', 'a'], '[""].a');
    test(['["a"].'], ['a'], 'a');
    test(['.["a"]'], ['a'], 'a');

    // Unescaped brackets.
    test(['['], ['["["]'], '["["]');
    test(["['"], ['["[\'"]'], '["[\'"]');
    test(["[''"], ['["[\'\'"]'], '["[\'\'"]');
    test(["['']"], ['["[\'\']"]'], '["[\'\']"]');
    test(['["'], ['["[\\""]'], '["[\\""]');
    test(['[""'], ['["[\\"\\""]'], '["[\\"\\""]');

    // Incorrect escape.
    test(['["a\\"]'], ['["[\\"a\\\\"]"]'], '["[\\"a\\\\"]"]');
    test(['[\\""]'], ['["[\\\\"\\"]"]'], '["[\\\\"\\"]"]');
    test(['[\\"a"]'], ['["[\\\\"a\\"]"]'], '["[\\\\"a\\"]"]');
    test(['["\\"]'], ['["[\\"\\\\"]"]'], '["[\\"\\\\"]"]');
    test(['["\\"\\"]'], ['["[\\"\\\\"\\\\"]"]'], '["[\\"\\\\"\\\\"]"]');
  });
});
