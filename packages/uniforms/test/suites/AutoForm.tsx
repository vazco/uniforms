import { render } from "@testing-library/react";
import React, { ComponentType } from "react";
import { ZodBridge } from "uniforms-bridge-zod";
import z from "zod";
import { expect, test } from "vitest";

export function testAutoForm(AutoForm: ComponentType<any>) {
  test("<AutoForm> - renders", () => {
    const schema = z.object({});
    const bridge = new ZodBridge({ schema });
    const screen = render(<AutoForm data-testid="form" schema={bridge} />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
}
