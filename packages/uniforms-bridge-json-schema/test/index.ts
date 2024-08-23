import { expect, test } from "vitest";

import * as uniformsJSONSchema from "uniforms-bridge-json-schema";

test("exports everything", () => {
  expect(uniformsJSONSchema).toHaveProperty("default", expect.any(Function));
  expect(uniformsJSONSchema).toHaveProperty(
    "JSONSchemaBridge",
    expect.any(Function),
  );
});
