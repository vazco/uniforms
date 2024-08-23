import { cleanup, screen } from "@testing-library/react";
import React, { ComponentType } from "react";
import z from "zod";
import { afterEach, expect, test } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testSubmitField(
  SubmitField: ComponentType<any>,
  { skipValueTest }: { skipValueTest?: boolean } = {},
) {
  afterEach(cleanup);

  test("<SubmitField> - renders disabled if error", () => {
    renderWithZod({
      element: <SubmitField />,
      schema: z.object({}),
      error: {},
    });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("<SubmitField> - renders enabled if error and enabled", () => {
    renderWithZod({
      element: <SubmitField disabled={false} />,
      schema: z.object({}),
      error: {},
    });
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test.skipIf(skipValueTest)(
    "<SubmitField> - renders a wrapper with correct value",
    () => {
      renderWithZod({
        element: <SubmitField value="Example" />,
        schema: z.object({}),
      });
      expect(screen.getByRole("button")).toHaveValue("Example");
    },
  );
}
