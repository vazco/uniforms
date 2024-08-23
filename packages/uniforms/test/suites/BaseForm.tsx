import { render } from "@testing-library/react";
import React, { ComponentType } from "react";
import { ZodBridge } from "uniforms-bridge-zod";
import z from "zod";
import { expect, test } from "vitest";

export function testBaseForm(BaseForm: ComponentType<any>) {
  const schema = new ZodBridge({ schema: z.object({}) });

  test("<BaseForm> - renders", () => {
    const { container } = render(<BaseForm schema={schema} />);
    expect(container.getElementsByTagName("form")).toHaveLength(1);
  });
}
