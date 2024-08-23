import { fireEvent, render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import { BaseForm, context } from "uniforms";
import { ZodBridge } from "uniforms-bridge-zod";
import { AutoField } from "uniforms-unstyled";
import { afterEach, describe, expect, test, vi } from "vitest";
import z from "zod";

describe("BaseForm", () => {
  const model = { $: [1], _: 1 };
  const schema = new ZodBridge({
    schema: z.object({ a: z.string().optional() }),
  });

  const onChange = vi.fn();
  const onSubmit = vi.fn();
  afterEach(() => {
    onChange.mockClear();
    onSubmit.mockClear();
  });

  describe("when rendered", () => {
    test("is <form>", () => {
      const { container } = render(<BaseForm schema={schema} />);
      expect(container.getElementsByTagName("form")).toHaveLength(1);
    });

    test("have correct children", () => {
      const { container } = render(
        <BaseForm schema={schema}>
          <div />
          <div />
          <div />
        </BaseForm>,
      );

      expect(container.getElementsByTagName("div")).toHaveLength(3);
    });
  });

  describe("when changed", () => {
    test("autosaves correctly (`autosave` = false)", async () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} model={model}>
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test" } });

      await new Promise((resolve) => setTimeout(resolve));

      expect(onSubmit).not.toBeCalled();
    });

    test("autosaves correctly (`autosave` = true)", async () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} model={model} autosave>
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test" } });

      await new Promise((resolve) => setTimeout(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    test("autosaves can be delayed", async () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={25}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test 1" } });
      fireEvent.change(input, { target: { value: "test 2" } });
      fireEvent.change(input, { target: { value: "test 3" } });

      await new Promise((resolve) => setTimeout(resolve));

      expect(onSubmit).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    test("autosaves can be delayed (longer)", async () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={10}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test 1" } });
      fireEvent.change(input, { target: { value: "test 2" } });
      fireEvent.change(input, { target: { value: "test 3" } });

      await new Promise((resolve) => setTimeout(resolve, 25));

      fireEvent.change(input, { target: { value: "test 1" } });
      fireEvent.change(input, { target: { value: "test 2" } });
      fireEvent.change(input, { target: { value: "test 3" } });

      await new Promise((resolve) => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    test("clears autosave correctly", () => {
      const { unmount } = render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          model={model}
          autosave
          autosaveDelay={100}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test 1" } });

      unmount();

      expect(onSubmit).not.toBeCalled();
    });

    test("calls `onChange` with correct name and value", () => {
      render(
        <BaseForm
          schema={schema}
          onSubmit={onSubmit}
          onChange={onChange}
          model={model}
        >
          <AutoField name="a" />
        </BaseForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "test 1" } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith("a", "test 1");
    });
  });

  describe("when submitted", () => {
    test("calls `onSubmit` once", () => {
      render(
        <BaseForm schema={schema} onSubmit={onSubmit} data-testid="form" />,
      );

      fireEvent.submit(screen.getByTestId("form"));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test("calls `onSubmit` with correct model", () => {
      render(
        <BaseForm
          model={model}
          schema={schema}
          onSubmit={onSubmit}
          data-testid="form"
        />,
      );

      fireEvent.submit(screen.getByTestId("form"));
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    test("calls `onSubmit` with the correctly `modelTransform`ed model", () => {
      render(
        <BaseForm
          model={model}
          schema={schema}
          onSubmit={onSubmit}
          data-testid="form"
          modelTransform={(mode, model) =>
            mode === "submit" ? { submit: 1 } : model
          }
        />,
      );

      fireEvent.submit(screen.getByTestId("form"));
      expect(onSubmit).toHaveBeenLastCalledWith({ submit: 1 });
    });

    test("sets `submitted` to true", async () => {
      let submitted: boolean | undefined;

      function Field() {
        const test = useContext(context);
        submitted = test?.submitted;
        return null;
      }

      render(
        <BaseForm schema={schema} onSubmit={onSubmit} data-testid="form">
          <Field />
        </BaseForm>,
      );

      expect(submitted).toBe(false);
      fireEvent.submit(screen.getByTestId("form"));
      expect(submitted).toBe(true);
    });

    test("sets `submitting` state while submitting", async () => {
      let submitting: boolean | undefined;

      function Field() {
        const test = useContext(context);
        submitting = test?.submitting;
        return null;
      }

      let resolveSubmit: (...args: any[]) => void = () => {};
      const test = () => new Promise((resolve) => (resolveSubmit = resolve));

      render(
        <BaseForm schema={schema} onSubmit={test} data-testid="form">
          <Field />
        </BaseForm>,
      );

      expect(submitting).toBe(false);

      const form = screen.getByTestId("form");
      fireEvent.submit(form);

      expect(submitting).toBe(true);

      resolveSubmit();
      await new Promise((resolve) => process.nextTick(resolve));

      expect(submitting).toBe(false);
    });
  });
});
