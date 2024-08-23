import { expect, test } from "vitest";

import * as uniformsSimpleSchema2 from "uniforms-bridge-simple-schema-2";

test("exports everything", () => {
  expect(uniformsSimpleSchema2).toHaveProperty("default", expect.any(Function));
  expect(uniformsSimpleSchema2).toHaveProperty(
    "SimpleSchema2Bridge",
    expect.any(Function),
  );
});
