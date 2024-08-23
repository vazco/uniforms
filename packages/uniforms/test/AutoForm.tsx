import { fireEvent, screen } from "@testing-library/react";
import omit from "lodash/omit";
import React from "react";
import SimpleSchema from "simpl-schema";
import { AutoForm, connectField, context } from "uniforms";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import { AutoFields } from "uniforms-unstyled";
import { render } from "uniforms/test/suites";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("<AutoForm />", () => {
  const onChange = vi.fn();
  const onChangeModel = vi.fn();
  const onSubmit = vi.fn();
  const validator = vi.fn();
  const contextSpy = vi.fn();
  const model = { a: "1" };
  const schemaDefinition = {
    a: { type: String, defaultValue: "" },
    b: { type: String, defaultValue: "" },
    c: { type: String, defaultValue: "" },
  };
  const schema = new SimpleSchema2Bridge({
    schema: new SimpleSchema(schemaDefinition),
  });

  vi.spyOn(schema.schema, "validator").mockImplementation(() => validator);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when changed", () => {
    test("updates", () => {
      render(
        <AutoForm onChange={onChange} schema={schema}>
          <AutoFields />
        </AutoForm>,
      );
      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "2" } });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith("a", "2");
    });

    test("validates", () => {
      render(
        <AutoForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          onChange={onChange}
          schema={schema}
        >
          <AutoFields />
        </AutoForm>,
      );

      const form = screen.getByRole("form");
      const input = screen.getByLabelText("A");
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: "", b: "", c: "" });

      fireEvent.change(input, { target: { value: "2" } });

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: "2", b: "", c: "" });
    });

    test("calls `onChangeModel`", () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge({ schema });
      render(
        <AutoForm onChangeModel={onChangeModel} schema={bridge}>
          <AutoFields />
        </AutoForm>,
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "a" } });

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: "a" });
    });

    test("updates `changed` and `changedMap`", () => {
      render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      const fieldA = screen.getByLabelText("A");
      const fieldC = screen.getByLabelText("C");
      fireEvent.change(fieldA, { target: { value: "a" } });
      fireEvent.change(fieldC, { target: { value: "c" } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          changed: true,
          changedMap: { a: {}, b: undefined, c: {} },
        }),
      );
    });
  });

  describe("when initial render", () => {
    test("merges initial values of schema and props.model", () => {
      const { rerenderWithProps } = render(
        <AutoForm schema={schema} model={{ c: "c", d: "d" }}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      // initial render shouldn't mark form as changed
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: { a: "", b: "", c: "c", d: "d" } }),
      );

      rerenderWithProps({ model: { c: undefined, d: "dd", e: "ee" } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          model: { a: "", b: "", d: "dd", e: "ee" },
        }),
      );
    });

    test("keeps `changed` false", () => {
      render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      // initial render shouldn't mark form as changed
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          changed: false,
          changedMap: {},
        }),
      );
    });

    test("does not call `onChange`", () => {
      const field = vi.fn(() => null);
      const Field = connectField(field);

      // @ts-expect-error Convoluted AutoForm types
      class CustomAutoForm extends AutoForm {
        getAutoField() {
          return Field;
        }

        getNativeFormProps() {
          return omit(super.getNativeFormProps(), "autoField");
        }
      }

      render(
        // @ts-expect-error JSX element type 'CustomAutoForm' does not have any construct or call signatures.ts(2604)
        <CustomAutoForm model={model} onChange={onChange} schema={schema} />,
      );

      expect(onChange).toHaveBeenCalledTimes(0);
      expect(field).toHaveBeenCalled();
    });
  });

  describe("when render", () => {
    test("skips `onSubmit` until rendered (`autosave` = true)", async () => {
      render(
        <AutoForm autosave onSubmit={onSubmit} schema={schema}>
          <AutoFields />
        </AutoForm>,
      );

      expect(onSubmit).not.toBeCalled();
      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "1" } });

      await new Promise((resolve) => setTimeout(resolve));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: "1", b: "", c: "" });
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({ a: "1", b: "", c: "" });
    });
  });

  describe.skip("when reset", () => {
    test("reset `model`", () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge({ schema });
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "a" } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: { a: "a" } }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: {} }),
      );
    });

    test("resets state `changedMap`", () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge({ schema });
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "a" } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: { a: {} } }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changedMap: {} }),
      );
    });

    test("resets state `changed`", () => {
      const schema = new SimpleSchema({ a: { type: String, optional: true } });
      const bridge = new SimpleSchema2Bridge({ schema });
      render(
        <AutoForm schema={bridge}>
          <context.Consumer children={contextSpy} />
          <AutoFields />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: false }),
      );

      const input = screen.getByLabelText("A");
      fireEvent.change(input, { target: { value: "a" } });

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: true }),
      );

      contextSpy.mock.calls.slice(-1)[0][0]?.formRef.reset();

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ changed: false }),
      );
    });
  });

  describe("when `props.model` update", () => {
    test("<AutoForm />, updates", () => {
      const { rerenderWithProps } = render(
        <AutoForm schema={schema}>
          <context.Consumer children={contextSpy} />
        </AutoForm>,
      );

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: { a: "", b: "", c: "" } }),
      );
      rerenderWithProps({ model: { d: "123" } });
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ model: { a: "", b: "", c: "", d: "123" } }),
      );
    });

    test("<AutoForm />, validates", () => {
      const { rerenderWithProps } = render(<AutoForm schema={schema} />);

      rerenderWithProps({ model, validate: "onChange" });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
