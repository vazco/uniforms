import { screen } from "@testing-library/react";
import React from "react";
import { DateField } from "uniforms-mui";
import { renderWithZod } from "uniforms/test/suites";
import { expect, test } from "vitest";
import { z } from "zod";

test("<DateField> - renders a Input with correct error text (specified)", () => {
  const error = new Error();
  renderWithZod({
    element: (
      <DateField name="x" error={error} errorMessage="Error" showInlineError />
    ),
    schema: z.object({ x: z.date() }),
  });
  expect(screen.getByText("Error")).toBeInTheDocument();
});

// FIXME:
test.skip("<DateField> - renders a Input with correct error text (showInlineError=false)", () => {
  const error = new Error();
  renderWithZod({
    element: (
      <DateField
        name="x"
        error={error}
        errorMessage="Error"
        showInlineError={false}
      />
    ),
    schema: z.object({ x: z.date() }),
  });
  expect(
    screen.getByText("X").nextElementSibling?.classList.contains("Mui-error"),
  ).toBe(true);
});
