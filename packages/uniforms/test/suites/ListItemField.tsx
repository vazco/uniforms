import { cleanup, screen } from "@testing-library/react";
import React, { ComponentType } from "react";
import z from "zod";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testListItemField(ListItemField: ComponentType<any>) {
  afterEach(cleanup);

  test("<ListItemField> - works", () => {
    renderWithZod({
      element: <ListItemField name="field" />,
      schema: z.object({ field: z.string().optional() }),
    });

    expect(screen.getByLabelText("Field")).toBeInTheDocument();
  });

  test("<ListItemField> - renders ListDelField", () => {
    renderWithZod({
      element: <ListItemField name="field" />,
      schema: z.object({ field: z.string() }),
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("<ListItemField> - renders children if specified", () => {
    const Child = vi.fn(() => <div />) as React.FC<any>;

    renderWithZod({
      element: (
        <ListItemField name="field">
          <Child />
        </ListItemField>
      ),
      schema: z.object({ field: z.string() }),
    });

    expect(Child).toHaveBeenCalledTimes(1);
  });
}
