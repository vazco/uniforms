import { screen } from "@testing-library/react";
import React, { ComponentType } from "react";
import z from "zod";
import { expect, test } from "vitest";

import { renderWithZod } from "./utils/render-zod";

export function testAutoFields(AutoFields: ComponentType<any>) {
  test("<AutoFields> - works", () => {
    renderWithZod({
      element: <AutoFields />,
      schema: z.object({ x: z.string() }),
    });

    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  test("<AutoFields> - render all fields by default", () => {
    renderWithZod({
      element: <AutoFields />,
      schema: z.object({ x: z.string(), y: z.string(), z: z.string() }),
    });

    expect(screen.getAllByRole("textbox")).toHaveLength(3);
  });

  test("<AutoFields> - renders only specified fields", () => {
    renderWithZod({
      element: <AutoFields fields={["x", "y"]} />,
      schema: z.object({ x: z.string(), y: z.string(), z: z.string() }),
    });

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.queryByLabelText("Z")).toBeNull();
  });

  test("<AutoFields> - does not render ommited fields", () => {
    renderWithZod({
      element: <AutoFields omitFields={["x"]} />,
      schema: z.object({ x: z.string(), y: z.string(), z: z.string() }),
    });

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.queryByLabelText("X")).toBeNull();
  });

  test("<AutoFields> - wraps fields in specified element", () => {
    const { container } = renderWithZod({
      element: <AutoFields element="section" />,
      schema: z.object({ x: z.string(), y: z.string(), z: z.string() }),
    });

    const section = container.querySelector("section");
    const inputs = section?.querySelectorAll("input");

    expect(section).toBeInTheDocument();
    expect(inputs).toHaveLength(3);
  });
}
