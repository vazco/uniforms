import { cleanup, render } from "@testing-library/react";
import React, { ComponentType } from "react";
import { ZodBridge } from "uniforms-bridge-zod";
import z from "zod";
import { afterEach, expect, test } from "vitest";

export function testQuickForm(QuickForm: ComponentType<any>) {
  afterEach(cleanup);

  const bridge = new ZodBridge({ schema: z.object({}) });

  test("<QuickForm> - renders", () => {
    const { container } = render(<QuickForm schema={bridge} />);
    expect(container.getElementsByTagName("form")).toHaveLength(1);
  });
}
