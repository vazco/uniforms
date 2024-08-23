import { Bridge } from "uniforms";
import { describe, expect, test } from "vitest";

describe("Bridge", () => {
  class CustomBridge extends Bridge {}
  const customBridgeInstance = new CustomBridge();

  test("cannot be instantiated", () => {
    // @ts-expect-error
    expect(() => new Bridge()).toThrow();
  });

  (
    [
      "getError",
      "getErrorMessage",
      "getErrorMessages",
      "getField",
      "getInitialValue",
      "getProps",
      "getSubfields",
      "getType",
      "getValidator",
    ] as const
  ).forEach((method) => {
    describe(`#${method}`, () => {
      test("throws an unimplemented error", () => {
        // @ts-expect-error
        expect(() => customBridgeInstance[method]()).toThrow();
      });
    });
  });
});
