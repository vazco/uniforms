import { expect, test } from "vitest";
import React, { ComponentType } from "react";
import z from "zod";

import { renderWithZod } from "./utils/render-zod";

export function testErrorsField(ErrorsField: ComponentType<any>) {
  test("<ErrorsField> - renders error from context", () => {
    const errorMessage = "Example error message";
    const screen = renderWithZod({
      element: <ErrorsField />,
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: errorMessage, path: ["x"] },
        { code: z.ZodIssueCode.custom, message: errorMessage, path: ["y"] },
        { code: z.ZodIssueCode.custom, message: errorMessage, path: ["z"] },
      ]),
      schema: z.object({ x: z.boolean(), y: z.number(), z: z.string() }),
    });
    expect(screen.getByText(`X: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.getByText(`Y: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.getByText(`Z: ${errorMessage}`)).toBeInTheDocument();
  });

  test("<ErrorsField> - renders error from props", () => {
    const errorMessage = "Example error message";
    const screen = renderWithZod({
      element: <ErrorsField>{errorMessage}</ErrorsField>,
      error: z.ZodError.create([]),
      schema: z.object({}),
    });
    expect(screen.container).toHaveTextContent(errorMessage);
  });
}
