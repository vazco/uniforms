import { render } from "@testing-library/react";
import React from "react";
import { QuickForm } from "uniforms";
import { ZodBridge } from "uniforms-bridge-zod";
import { afterEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";

describe("QuickForm", () => {
  const AutoField = vi.fn(() => null) as any;
  const ErrorsField = vi.fn(() => null) as any;
  const SubmitField = vi.fn(() => null) as any;

  // @ts-expect-error QuickForm is not a valid Component.
  class TestForm extends QuickForm<any> {
    getAutoField = () => () => <AutoField />;
    getErrorsField = () => () => <ErrorsField />;
    getSubmitField = () => () => <SubmitField />;
  }

  const schema = z.object({
    a: z.string(),
    b: z.string(),
    c: z.string(),
  });
  const bridge = new ZodBridge({ schema });

  afterEach(() => {
    AutoField.mockClear();
    ErrorsField.mockClear();
    SubmitField.mockClear();
  });

  describe("when rendered with custom fields", () => {
    test("renders `AutoField` for each field", () => {
      render(<TestForm schema={bridge} />);

      expect(AutoField).toHaveBeenCalledTimes(3);
    });

    test("renders `ErrorsField`", () => {
      render(<TestForm schema={bridge} />);

      expect(ErrorsField).toHaveBeenCalledTimes(1);
    });

    test("renders `SubmitField`", () => {
      render(<TestForm schema={bridge} />);

      expect(SubmitField).toHaveBeenCalledTimes(1);
    });
  });

  describe("when rendered with custom fields in `props`", () => {
    test("renders `ErrorsField`", () => {
      const ErrorsOverrideField = vi.fn(() => <div />) as React.FC<any>;

      render(
        <TestForm
          schema={bridge}
          errorsField={() => <ErrorsOverrideField />}
        />,
      );

      expect(ErrorsOverrideField).toHaveBeenCalledTimes(1);
    });

    test("renders `SubmitField`", () => {
      const SubmitOverrideField = vi.fn(() => <div />) as React.FC<any>;

      render(
        <TestForm
          schema={bridge}
          submitField={() => <SubmitOverrideField />}
        />,
      );

      expect(SubmitOverrideField).toHaveBeenCalledTimes(1);
    });
  });

  describe("when rendered with children", () => {
    test("renders children", () => {
      const Child = vi.fn(() => <div />) as React.FC<any>;

      render(
        <QuickForm schema={bridge}>
          <Child />
        </QuickForm>,
      );

      expect(Child).toHaveBeenCalledTimes(1);
    });
  });
});
