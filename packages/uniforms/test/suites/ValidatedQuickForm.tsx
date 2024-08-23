import { cleanup, render } from "@testing-library/react";
import React, { ComponentType } from "react";
import { ZodBridge } from "uniforms-bridge-zod";
import z from "zod";
import { afterEach, expect, test } from "vitest";

export function testValidatedQuickForm(ValidatedQuickForm: ComponentType<any>) {
  afterEach(cleanup);

  test("<ValidatedQuickForm> - renders", () => {
    const schema = z.object({});
    const bridge = new ZodBridge({ schema });
    const screen = render(
      <ValidatedQuickForm data-testid="form" schema={bridge} />,
    );
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
}
