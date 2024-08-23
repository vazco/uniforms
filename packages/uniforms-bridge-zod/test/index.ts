import { expect, test } from "vitest";

import * as uniformsZod from "uniforms-bridge-zod";

test("exports everything", () => {
  expect(uniformsZod).toHaveProperty("default", expect.any(Function));
  expect(uniformsZod).toHaveProperty("ZodBridge", expect.any(Function));
});
