import { screen } from "@testing-library/react";
import React from "react";
import { NestField } from "uniforms-mui";
import { renderWithZod } from "uniforms/test/suites";
import { describe, expect, test } from "vitest";
import { z } from "zod";

describe("@RTL - NestField tests", () => {
  test("<NestField> - renders a label (required annotation)", () => {
    const { container } = renderWithZod({
      element: <NestField name="x" label="y" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    const label = container.getElementsByTagName("legend")[0]?.textContent;

    expect(label).toBe("y *");
  });

  test("<NestField> - renders a helperText", () => {
    renderWithZod({
      element: <NestField name="x" helperText="Helper" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    expect(screen.getByText("Helper")).toBeInTheDocument();
  });
});
