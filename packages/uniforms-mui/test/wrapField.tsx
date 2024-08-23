import { screen } from "@testing-library/react";
import React from "react";
import { wrapField } from "uniforms-mui";
import { renderWithZod } from "uniforms/test/suites";
import { describe, expect, test } from "vitest";
import { z } from "zod";

describe("wrapField tests", () => {
  test("<wrapField> - renders wrapper", () => {
    renderWithZod({
      element: wrapField({}, <div data-testid="x" />),
      schema: z.object({}),
    });
    expect(
      screen
        .getByTestId("x")
        .parentElement?.classList.contains("MuiFormControl-root"),
    ).toBe(true);
  });
});
