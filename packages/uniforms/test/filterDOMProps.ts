import { filterDOMProps } from "uniforms";
import { describe, expect, test } from "vitest";

describe("joinName", () => {
  test("is a function", () => {
    expect(filterDOMProps).toBeInstanceOf(Function);
  });

  test("removes props", () => {
    expect(filterDOMProps({ value: 999999 })).toEqual({});
    expect(filterDOMProps({ changed: true })).toEqual({});
  });

  test("removes registered props", () => {
    // @ts-expect-error: Do not register its type not to pollute it.
    filterDOMProps.register("__special__");

    expect(filterDOMProps({ __special__: true })).toEqual({});
  });

  test("ignores double registers", () => {
    const { length } = filterDOMProps.registered;
    filterDOMProps.register("value");
    expect(filterDOMProps.registered).toHaveLength(length);
  });

  test("omits rest", () => {
    expect(filterDOMProps({ a: 1 })).toEqual({ a: 1 });
    expect(filterDOMProps({ b: 2 })).toEqual({ b: 2 });
  });
});
