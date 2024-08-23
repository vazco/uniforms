import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { SelectField } from "uniforms-semantic";
import { renderWithZod } from "uniforms/test/suites/utils/render-zod";
import { expect, test } from "vitest";
import { z } from "zod";

test("<SelectField> - disabled items (options) based on predicate", () => {
  renderWithZod({
    element: (
      <SelectField
        data-testid="select"
        name="x"
        options={[
          { key: "k1", label: "A", value: "a", disabled: true },
          { key: "k2", label: "B", value: "b", disabled: false },
        ]}
      />
    ),
    schema: z.object({ x: z.enum(["a", "b"]) }),
  });

  fireEvent.click(screen.getByTestId("select"));

  expect(screen.getByText("A")).toBeDisabled();
  expect(screen.getByText("B")).toBeEnabled();
});
