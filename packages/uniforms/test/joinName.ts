import { joinName } from "uniforms";
import { describe, expect, test } from "vitest";

function testCase(parts: unknown[], array: string[], string: string) {
  // Serialization (join).
  expect(joinName(...parts)).toBe(string);

  // Deserialization (split).
  expect(joinName(null, ...parts)).toEqual(array);

  // Re-serialization (split + join).
  expect(joinName(joinName(null, ...parts))).toEqual(string);

  // Re-deserialization (join + split).
  expect(joinName(null, joinName(...parts))).toEqual(array);
}

describe("joinName", () => {
  test("is a function", () => {
    expect(joinName).toBeInstanceOf(Function);
  });

  test("works with empty name", () => {
    testCase([], [], "");
  });

  test("works with arrays", () => {
    testCase([["a"]], ["a"], "a");
    testCase([[["a"]]], ["a"], "a");
    testCase([[[["a"]]]], ["a"], "a");

    testCase([[], "a"], ["a"], "a");
    testCase(["a", []], ["a"], "a");

    testCase([["a"], "b"], ["a", "b"], "a.b");
    testCase(["a", ["b"]], ["a", "b"], "a.b");

    testCase([["a", "b"], "c"], ["a", "b", "c"], "a.b.c");
    testCase(["a", ["b", "c"]], ["a", "b", "c"], "a.b.c");

    testCase(["a", ["b", "c"], "d"], ["a", "b", "c", "d"], "a.b.c.d");
  });

  test("works with empty strings", () => {
    testCase(["", "a", "b"], ["a", "b"], "a.b");
    testCase(["a", "", "b"], ["a", "b"], "a.b");
    testCase(["a", "b", ""], ["a", "b"], "a.b");
  });

  test("works with falsy values", () => {
    testCase(["a", null, "b"], ["a", "b"], "a.b");
    testCase(["a", false, "b"], ["a", "b"], "a.b");
    testCase(["a", undefined, "b"], ["a", "b"], "a.b");
  });

  test("works with numbers", () => {
    testCase([0, "a", "b"], ["0", "a", "b"], "0.a.b");
    testCase(["a", 0, "b"], ["a", "0", "b"], "a.0.b");
    testCase(["a", "b", 0], ["a", "b", "0"], "a.b.0");
    testCase([1, "a", "b"], ["1", "a", "b"], "1.a.b");
    testCase(["a", 1, "b"], ["a", "1", "b"], "a.1.b");
    testCase(["a", "b", 1], ["a", "b", "1"], "a.b.1");
  });

  test("works with partials", () => {
    testCase(["a", "b.c.d"], ["a", "b", "c", "d"], "a.b.c.d");
    testCase(["a.b", "c.d"], ["a", "b", "c", "d"], "a.b.c.d");
    testCase(["a.b.c", "d"], ["a", "b", "c", "d"], "a.b.c.d");
  });

  test("works with subscripts", () => {
    testCase(['a["b"]'], ["a", "b"], "a.b");
    testCase(['a["b"].c'], ["a", "b", "c"], "a.b.c");
    testCase(['a["b"].c["d"]'], ["a", "b", "c", "d"], "a.b.c.d");
    testCase(['a["b"]["c.d"]'], ["a", "b", '["c.d"]'], 'a.b["c.d"]');
    testCase(['a["b"]["c.d"].e'], ["a", "b", '["c.d"]', "e"], 'a.b["c.d"].e');
    testCase(
      ['a["b"]["c.d"]["e"]'],
      ["a", "b", '["c.d"]', "e"],
      'a.b["c.d"].e',
    );
    testCase(['a["b"].["c.d"]'], ["a", "b", '["c.d"]'], 'a.b["c.d"]');
    testCase(['a["b"].["c.d"].e'], ["a", "b", '["c.d"]', "e"], 'a.b["c.d"].e');
    testCase(
      ['a["b"].["c.d"]["e"]'],
      ["a", "b", '["c.d"]', "e"],
      'a.b["c.d"].e',
    );

    testCase(['["a"]'], ["a"], "a");
    testCase(['["a"].b'], ["a", "b"], "a.b");
    testCase(['["a"]["b.c"]'], ["a", '["b.c"]'], 'a["b.c"]');
    testCase(['["a"]["b.c"].d'], ["a", '["b.c"]', "d"], 'a["b.c"].d');
    testCase(['["a"]["b.c"]["d"]'], ["a", '["b.c"]', "d"], 'a["b.c"].d');
    testCase(['["a"].["b.c"]'], ["a", '["b.c"]'], 'a["b.c"]');
    testCase(['["a"].["b.c"].d'], ["a", '["b.c"]', "d"], 'a["b.c"].d');
    testCase(['["a"].["b.c"]["d"]'], ["a", '["b.c"]', "d"], 'a["b.c"].d');

    testCase(['[""]'], ['[""]'], '[""]');
    testCase(['["."]'], ['["."]'], '["."]');
    testCase(['[".."]'], ['[".."]'], '[".."]');
    testCase(['["..."]'], ['["..."]'], '["..."]');
    testCase(["[\"['']\"]"], ["[\"['']\"]"], "[\"['']\"]");
    testCase(['["[\\"\\"]"]'], ['["[\\"\\"]"]'], '["[\\"\\"]"]');
  });

  test("handles incorrect cases _somehow_", () => {
    // Boolean `true`.
    testCase([true], ["true"], "true");
    testCase([true, "a"], ["true", "a"], "true.a");
    testCase(["a", true], ["a", "true"], "a.true");

    // Dots before subscripts.
    testCase(['a["b"].c.["d"]'], ["a", "b", "c", "d"], "a.b.c.d");
    testCase(['a.["b"].c["d"]'], ["a", "b", "c", "d"], "a.b.c.d");
    testCase(['a.["b"].c.["d"]'], ["a", "b", "c", "d"], "a.b.c.d");

    // Only dots.
    testCase(["."], ['["."]'], '["."]');
    testCase([".."], ['[".."]'], '[".."]');
    testCase(["..."], ['["..."]'], '["..."]');

    // Leading and trailing dots.
    testCase(["a."], ['["a."]'], '["a."]');
    testCase([".a"], ['[""]', "a"], '[""].a');
    testCase(['["a"].'], ["a"], "a");
    testCase(['.["a"]'], ["a"], "a");

    // Unescaped brackets.
    testCase(["["], ['["["]'], '["["]');
    testCase(["['"], ['["[\'"]'], '["[\'"]');
    testCase(["[''"], ["[\"[''\"]"], "[\"[''\"]");
    testCase(["['']"], ["[\"['']\"]"], "[\"['']\"]");
    testCase(['["'], ['["[\\""]'], '["[\\""]');
    testCase(['[""'], ['["[\\"\\""]'], '["[\\"\\""]');

    // Incorrect escape.
    testCase(['["a\\"]'], ['["[\\"a\\\\"]"]'], '["[\\"a\\\\"]"]');
    testCase(['[\\""]'], ['["[\\\\"\\"]"]'], '["[\\\\"\\"]"]');
    testCase(['[\\"a"]'], ['["[\\\\"a\\"]"]'], '["[\\\\"a\\"]"]');
    testCase(['["\\"]'], ['["[\\"\\\\"]"]'], '["[\\"\\\\"]"]');
    testCase(['["\\"\\"]'], ['["[\\"\\\\"\\\\"]"]'], '["[\\"\\\\"\\\\"]"]');
  });
});
