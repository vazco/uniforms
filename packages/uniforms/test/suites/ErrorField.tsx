import React, { ComponentType } from "react";
import z from "zod";
import { expect, test } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testErrorField(ErrorField: ComponentType<any>) {
  test("<ErrorField> - renders error from context", () => {
    const errorMessage = "Example error message";
    const screen = renderWithZod({
      element: <ErrorField name="x" />,
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: errorMessage, path: ["x"] },
      ]),
      schema: z.object({ x: z.string() }),
    });
    expect(screen.container).toHaveTextContent(errorMessage);
  });

  test("<ErrorField> - renders error from props", () => {
    const errorMessage = "Example error message";
    const screen = renderWithZod({
      element: <ErrorField name="x">{errorMessage}</ErrorField>,
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: "", path: ["x"] },
      ]),
      schema: z.object({ x: z.string() }),
    });
    expect(screen.container).toHaveTextContent(errorMessage);
  });

  test("<ErrorField> - ignores errors from other fields", () => {
    const errorMessage = "Example error message";
    const screen = renderWithZod({
      element: <ErrorField name="x" />,
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: errorMessage, path: ["y"] },
      ]),
      schema: z.object({ x: z.string() }),
    });
    expect(screen.container).not.toHaveTextContent(errorMessage);
  });
}
