import { render } from "@testing-library/react";
import React, { ComponentType } from "react";
import { ZodBridge } from "uniforms-bridge-zod";
import z from "zod";
import { expect, test } from "vitest";

export function testValidatedForm(ValidatedForm: ComponentType<any>) {
  test("<ValidatedForm> - renders", () => {
    const schema = z.object({});
    const bridge = new ZodBridge({ schema });
    const screen = render(<ValidatedForm data-testid="form" schema={bridge} />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
}
