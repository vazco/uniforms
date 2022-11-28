import { joinName } from 'uniforms';

function testFn(parts: unknown[], array: string[], string: string) {
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
    testFn([], [], '');
  });

  it('works with arrays', () => {
    testFn([['a']], ['a'], 'a');
    testFn([[['a']]], ['a'], 'a');
    testFn([[[['a']]]], ['a'], 'a');

    testFn([[], 'a'], ['a'], 'a');
    testFn(['a', []], ['a'], 'a');

    testFn([['a'], 'b'], ['a', 'b'], 'a.b');
    testFn(['a', ['b']], ['a', 'b'], 'a.b');

    testFn([['a', 'b'], 'c'], ['a', 'b', 'c'], 'a.b.c');
    testFn(['a', ['b', 'c']], ['a', 'b', 'c'], 'a.b.c');

    testFn(['a', ['b', 'c'], 'd'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
  });

  it('works with empty strings', () => {
    testFn(['', 'a', 'b'], ['a', 'b'], 'a.b');
    testFn(['a', '', 'b'], ['a', 'b'], 'a.b');
    testFn(['a', 'b', ''], ['a', 'b'], 'a.b');
  });

  it('works with falsy values', () => {
    testFn(['a', null, 'b'], ['a', 'b'], 'a.b');
    testFn(['a', false, 'b'], ['a', 'b'], 'a.b');
    testFn(['a', undefined, 'b'], ['a', 'b'], 'a.b');
  });

  it('works with numbers', () => {
    testFn([0, 'a', 'b'], ['0', 'a', 'b'], '0.a.b');
    testFn(['a', 0, 'b'], ['a', '0', 'b'], 'a.0.b');
    testFn(['a', 'b', 0], ['a', 'b', '0'], 'a.b.0');
    testFn([1, 'a', 'b'], ['1', 'a', 'b'], '1.a.b');
    testFn(['a', 1, 'b'], ['a', '1', 'b'], 'a.1.b');
    testFn(['a', 'b', 1], ['a', 'b', '1'], 'a.b.1');
  });

  it('works with partials', () => {
    testFn(['a', 'b.c.d'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    testFn(['a.b', 'c.d'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    testFn(['a.b.c', 'd'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
  });

  it('works with subscripts', () => {
    testFn(['a["b"]'], ['a', 'b'], 'a.b');
    testFn(['a["b"].c'], ['a', 'b', 'c'], 'a.b.c');
    testFn(['a["b"].c["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    testFn(['a["b"]["c.d"]'], ['a', 'b', '["c.d"]'], 'a.b["c.d"]');
    testFn(['a["b"]["c.d"].e'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    testFn(['a["b"]["c.d"]["e"]'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    testFn(['a["b"].["c.d"]'], ['a', 'b', '["c.d"]'], 'a.b["c.d"]');
    testFn(['a["b"].["c.d"].e'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');
    testFn(['a["b"].["c.d"]["e"]'], ['a', 'b', '["c.d"]', 'e'], 'a.b["c.d"].e');

    testFn(['["a"]'], ['a'], 'a');
    testFn(['["a"].b'], ['a', 'b'], 'a.b');
    testFn(['["a"]["b.c"]'], ['a', '["b.c"]'], 'a["b.c"]');
    testFn(['["a"]["b.c"].d'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    testFn(['["a"]["b.c"]["d"]'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    testFn(['["a"].["b.c"]'], ['a', '["b.c"]'], 'a["b.c"]');
    testFn(['["a"].["b.c"].d'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');
    testFn(['["a"].["b.c"]["d"]'], ['a', '["b.c"]', 'd'], 'a["b.c"].d');

    testFn(['[""]'], ['[""]'], '[""]');
    testFn(['["."]'], ['["."]'], '["."]');
    testFn(['[".."]'], ['[".."]'], '[".."]');
    testFn(['["..."]'], ['["..."]'], '["..."]');
    testFn(['["[\'\']"]'], ['["[\'\']"]'], '["[\'\']"]');
    testFn(['["[\\"\\"]"]'], ['["[\\"\\"]"]'], '["[\\"\\"]"]');
  });

  it('handles incorrect cases _somehow_', () => {
    // Boolean `true`.
    testFn([true], ['true'], 'true');
    testFn([true, 'a'], ['true', 'a'], 'true.a');
    testFn(['a', true], ['a', 'true'], 'a.true');

    // Dots before subscripts.
    testFn(['a["b"].c.["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    testFn(['a.["b"].c["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');
    testFn(['a.["b"].c.["d"]'], ['a', 'b', 'c', 'd'], 'a.b.c.d');

    // Only dots.
    testFn(['.'], ['["."]'], '["."]');
    testFn(['..'], ['[".."]'], '[".."]');
    testFn(['...'], ['["..."]'], '["..."]');

    // Leading and trailing dots.
    testFn(['a.'], ['["a."]'], '["a."]');
    testFn(['.a'], ['[""]', 'a'], '[""].a');
    testFn(['["a"].'], ['a'], 'a');
    testFn(['.["a"]'], ['a'], 'a');

    // Unescaped brackets.
    testFn(['['], ['["["]'], '["["]');
    testFn(["['"], ['["[\'"]'], '["[\'"]');
    testFn(["[''"], ['["[\'\'"]'], '["[\'\'"]');
    testFn(["['']"], ['["[\'\']"]'], '["[\'\']"]');
    testFn(['["'], ['["[\\""]'], '["[\\""]');
    testFn(['[""'], ['["[\\"\\""]'], '["[\\"\\""]');

    // Incorrect escape.
    testFn(['["a\\"]'], ['["[\\"a\\\\"]"]'], '["[\\"a\\\\"]"]');
    testFn(['[\\""]'], ['["[\\\\"\\"]"]'], '["[\\\\"\\"]"]');
    testFn(['[\\"a"]'], ['["[\\\\"a\\"]"]'], '["[\\\\"a\\"]"]');
    testFn(['["\\"]'], ['["[\\"\\\\"]"]'], '["[\\"\\\\"]"]');
    testFn(['["\\"\\"]'], ['["[\\"\\\\"\\\\"]"]'], '["[\\"\\\\"\\\\"]"]');
  });
});
