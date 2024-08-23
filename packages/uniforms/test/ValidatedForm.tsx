import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import SimpleSchema from "simpl-schema";
import {
  ModelTransformMode,
  UnknownObject,
  ValidatedForm,
  context,
  useForm,
} from "uniforms";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import { AutoField } from "uniforms-unstyled";
import { render } from "uniforms/test/suites";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("ValidatedForm", () => {
  const onChange = vi.fn();
  const onSubmit = vi.fn();
  const onValidate = vi.fn((model, error) => error);
  const validator = vi.fn();
  const validatorForSchema = vi.fn(() => validator);
  const contextSpy = vi.fn();

  const error = new Error();
  const model = { a: 1 };
  const schemaDefinition = {
    a: { type: String, defaultValue: "" },
    b: { type: String, defaultValue: "" },
    c: { type: String, defaultValue: "" },
  };
  const schema = new SimpleSchema2Bridge({
    schema: new SimpleSchema(schemaDefinition),
  });
  vi.spyOn(schema.schema, "validator").mockImplementation(validatorForSchema);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("on validation", () => {
    // FIXME: ValidatedForm is not a valid Component.

    test("validates (when `.validate` is called)", () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        />,
      );
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      expect(validator).toHaveBeenCalledTimes(1);
    });

    test("correctly calls `validator`", () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
      );
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith(model);
    });
    test("updates error state with errors from `validator`", async () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
      );
      const form = screen.getByRole("form");

      validator.mockImplementationOnce(() => {
        throw error;
      });

      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));

      expect(onValidate).toHaveBeenLastCalledWith(model, error);
    });

    test("correctly calls `onValidate` when validation succeeds", () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        />,
      );
      const form = screen.getByRole("form");

      fireEvent.submit(form);
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, null);
    });

    test("correctly calls `onValidate` when validation fails ", () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
      );
      const form = screen.getByRole("form");

      validator.mockImplementationOnce(() => {
        throw error;
      });

      fireEvent.submit(form);

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, error);
    });

    test("updates error state with async errors from `onValidate`", async () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );
      const form = screen.getByRole("form");

      onValidate.mockImplementationOnce(() => error);

      fireEvent.submit(form);
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ error }),
      );
    });
    test("leaves error state alone when `onValidate` suppress `validator` errors", async () => {
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );
      const form = screen.getByRole("form");

      validator.mockImplementationOnce(() => {
        throw error;
      });
      onValidate.mockImplementationOnce(() => null);
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalled();
      expect(onValidate).toHaveBeenCalled();
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ error: null }),
      );
    });
    test("has `validating` context variable, default `false`", () => {
      render(
        <ValidatedForm
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );

      expect(contextSpy).toHaveBeenCalledWith(
        expect.objectContaining({ validating: false }),
      );
    });

    test("uses `modelTransform`s `validate` mode", () => {
      const transformedModel = { b: 1 };
      const modelTransform = (
        mode: ModelTransformMode,
        model: UnknownObject,
      ) => (mode === "validate" ? transformedModel : model);
      render(
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          modelTransform={modelTransform}
        />,
      );
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      expect(validator).toHaveBeenLastCalledWith(transformedModel);
      expect(onValidate).toHaveBeenLastCalledWith(transformedModel, null);
    });
  });

  describe("when submitted", () => {
    test("calls `onSubmit` when validation succeeds", async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
      );

      const form = screen.getByRole("form");
      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test("skips `onSubmit` when validation fails", async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
      );

      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole("form");
      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));

      expect(onSubmit).not.toBeCalled();
    });

    test("sets submitted to true, when form is submitted and validation succeeds", () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );
      const form = screen.getByRole("form");

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ submitted: false }),
      );

      fireEvent.submit(form);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ submitted: true }),
      );
    });

    test("sets submitted to true, when form is submitted and validation fails", () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );

      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole("form");

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ submitted: false }),
      );

      fireEvent.submit(form);

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ submitted: true }),
      );
    });

    test("updates error state with async errors from `onSubmit`", async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer children={contextSpy} />
        </ValidatedForm>,
      );

      onSubmit.mockImplementationOnce(() => Promise.reject(error));
      const form = screen.getByRole("form");

      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalled();
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ error }),
      );
    });

    test("works if unmounts on submit", async () => {
      const { unmount } = render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
      );
      const form = screen.getByRole("form");
      onSubmit.mockImplementationOnce(() => unmount());
      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));
    });
  });

  describe("on change", () => {
    describe("in `onChange` mode", () => {
      test("validates", () => {
        // FIXME: ValidatedForm is not a valid Component.
        render(
          <ValidatedForm
            schema={schema}
            model={model}
            onChange={onChange}
            validate="onChange"
          >
            <AutoField name="a" />
          </ValidatedForm>,
        );
        const input = screen.getByLabelText("A");
        fireEvent.change(input, { target: { value: "test" } });
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe("in `onSubmit` mode", () => {
      test("does not validate", () => {
        // FIXME: ValidatedForm is not a valid Component.
        render(
          <ValidatedForm model={model} schema={schema} validate="onSubmit">
            <AutoField name="a" />
          </ValidatedForm>,
        );
        const input = screen.getByLabelText("A");
        fireEvent.change(input, { target: { value: "test" } });

        expect(validator).not.toHaveBeenCalled();
      });
    });

    describe("in `onChangeAfterSubmit` mode", () => {
      test("does not validates before submit", () => {
        render(
          // FIXME: ValidatedForm is not a valid Component.
          <ValidatedForm
            model={model}
            schema={schema}
            validate="onChangeAfterSubmit"
          >
            <AutoField name="a" />
          </ValidatedForm>,
        );
        const input = screen.getByLabelText("A");
        fireEvent.change(input, { target: { value: "test" } });

        expect(validator).not.toHaveBeenCalled();
      });

      test("validates after submit", async () => {
        render(
          // FIXME: ValidatedForm is not a valid Component.
          <ValidatedForm
            // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
            name="form"
            model={model}
            schema={schema}
            validate="onChangeAfterSubmit"
          >
            <AutoField name="a" />
          </ValidatedForm>,
        );

        const form = screen.getByRole("form");
        fireEvent.submit(form);
        await new Promise((resolve) => process.nextTick(resolve));

        validator.mockClear();
        const input = screen.getByLabelText("A");
        fireEvent.change(input, { target: { value: "test" } });

        expect(validator).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("on reset", () => {
    test("removes `error`", async () => {
      const FormControls = () => {
        const { formRef } = useForm();

        return (
          <>
            <button onClick={() => formRef.reset()}>Reset</button>
          </>
        );
      };

      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          model={model}
          onSubmit={onSubmit}
          schema={schema}
        >
          <context.Consumer children={contextSpy} />
          <FormControls />
        </ValidatedForm>,
      );
      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole("form");
      const resetButton = screen.getByText("Reset");

      fireEvent.submit(form);
      await new Promise((resolve) => process.nextTick(resolve));

      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ error }),
      );

      fireEvent.click(resetButton);
      await new Promise((resolve) => process.nextTick(resolve));
      expect(contextSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ error: null }),
      );
    });
  });

  describe("when props are changed", () => {
    const anotherModel = { x: 2 };

    // FIXME: ValidatedForm is not a valid Component.
    const Component = (props: Record<any, any>) => (
      <ValidatedForm
        model={model}
        schema={schema}
        validate="onChange"
        {...props}
      />
    );

    test("does not revalidate arbitrarily", () => {
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ anything: "anything" });
      expect(validator).not.toBeCalled();
    });

    test("revalidates if `model` changes", () => {
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ model: anotherModel });
      expect(validator).toHaveBeenCalledTimes(1);
    });

    test("revalidates if `validator` changes", () => {
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ validator: {} });
      expect(validator).toHaveBeenCalledTimes(1);
    });

    test("revalidate if `schema` changes", () => {
      const anotherSchema = new SimpleSchema2Bridge({ schema: schema.schema });
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ schema: anotherSchema });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });

  describe("in `onSubmit` mode", () => {
    // FIXME: ValidatedForm is not a valid Component.
    const Component = () => (
      <ValidatedForm model={model} schema={schema} validate="onSubmit" />
    );

    test("does not revalidate when `model` changes", () => {
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ model: {} });
      expect(validator).not.toBeCalled();
    });

    test("does not revalidate when validator `options` change", () => {
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ validator: {} });
      expect(validator).not.toBeCalled();
    });

    test("does not revalidate when `schema` changes", () => {
      const anotherSchema = new SimpleSchema2Bridge({ schema: schema.schema });
      const { rerenderWithProps } = render(<Component />);
      rerenderWithProps({ schema: anotherSchema });
      expect(validator).not.toBeCalled();
    });
  });

  describe("in any mode", () => {
    test("reuses the validator between validations", () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          model={model}
          schema={schema}
        >
          <AutoField name="a" />
        </ValidatedForm>,
      );
      ["1", "2", "3"].forEach((value) => {
        const form = screen.getByRole("form");
        const input = screen.getByLabelText("A");
        fireEvent.change(input, { target: { value } });
        fireEvent.submit(form);
      });

      expect(validatorForSchema).toHaveBeenCalledTimes(1);
    });

    test("uses the new validator settings if `validator` changes", () => {
      const validatorA = Symbol();
      const validatorB = Symbol();
      const { rerenderWithProps } = render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm model={model} schema={schema} />,
      );

      rerenderWithProps({ validator: validatorA });
      expect(validatorForSchema).toHaveBeenCalledTimes(2);
      expect(validatorForSchema).toHaveBeenNthCalledWith(2, validatorA);

      rerenderWithProps({ validator: validatorB });
      expect(validatorForSchema).toHaveBeenCalledTimes(3);
      expect(validatorForSchema).toHaveBeenNthCalledWith(3, validatorB);

      rerenderWithProps({ validator: validatorA });
      expect(validatorForSchema).toHaveBeenCalledTimes(4);
      expect(validatorForSchema).toHaveBeenNthCalledWith(4, validatorA);
    });

    test("uses the new validator if `schema` changes", () => {
      const alternativeValidator = vi.fn();
      const alternativeSchema = new SimpleSchema2Bridge({
        schema: schema.schema,
      });
      vi.spyOn(alternativeSchema, "getValidator").mockImplementation(
        () => alternativeValidator,
      );
      const { rerenderWithProps } = render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
          name="form"
          model={model}
          schema={schema}
        >
          <AutoField name="a" />
        </ValidatedForm>,
      );

      rerenderWithProps({
        schema: alternativeSchema,
      });
      const form = screen.getByRole("form");
      fireEvent.submit(form);

      expect(validator).not.toBeCalled();
      expect(alternativeValidator).toHaveBeenCalledTimes(1);
    });
  });

  describe("validation flow", () => {
    const variantGroups = [
      {
        "fail-async": () => Promise.resolve(error),
        "fail-sync": () => error,
        "good-async": () => Promise.resolve(null),
        "good-async-silent": () => Promise.resolve(),
        "good-sync": () => null,
        "good-sync-silent": () => {},
      },
      {
        "fail-async": () => Promise.resolve(error),
        "fail-sync": () => error,
        "good-async": () => Promise.resolve(null),
        "good-async-silent": () => Promise.resolve(),
        "good-sync": () => null,
        "good-sync-silent": () => {},
        "pass-async": (_: string, error: any) => Promise.resolve(error),
        "pass-sync": (_: string, error: any) => error,
      },
      {
        "fail-async": () =>
          new Promise((_, reject) => setTimeout(() => reject(error))),
        "good-async": () =>
          new Promise((resolve) => setTimeout(() => resolve("ok"))),
        "good-sync": () => "ok",
      },
    ] as const;

    function cartesian<X, Y>(xs: X[], ys: Y[]) {
      return xs.reduce<[X, Y][]>(
        (xys, x) => ys.reduce((xys, y) => [...xys, [x, y]], xys),
        [],
      );
    }

    function keys<X extends object>(x: X) {
      return Object.keys(x) as (keyof X)[];
    }

    const cases = cartesian(
      [true, false] as [true, false],
      cartesian(
        keys(variantGroups[0]),
        cartesian(keys(variantGroups[1]), keys(variantGroups[2])),
      ),
    );

    const alternativeSchema = new SimpleSchema2Bridge({
      schema: schema.schema,
    });
    alternativeSchema.getValidator = () => validator;

    function flatPair4<A, B, C, D>([a, [b, [c, d]]]: [A, [B, [C, D]]]) {
      return [a, b, c, d] as const;
    }

    test.each(cases.map(flatPair4))(
      "works for %p/%p/%p/%p",
      async (...modes) => {
        const [hasError, validatorMode, onValidateMode, onSubmitMode] = modes;

        render(
          // FIXME: ValidatedForm is not a valid Component.
          <ValidatedForm
            // @ts-expect-error https://github.com/vazco/uniforms/issues/1165
            name="form"
            error={hasError ? error : null}
            onSubmit={onSubmit}
            onValidate={onValidate}
            schema={alternativeSchema}
          >
            <context.Consumer children={contextSpy} />
          </ValidatedForm>,
        );

        const asyncSubmission = onSubmitMode.includes("async");
        const asyncValidation =
          validatorMode.includes("async") || onValidateMode.includes("async");
        const hasValidationError =
          hasError ||
          (validatorMode.includes("good")
            ? onValidateMode.includes("fail")
            : !onValidateMode.includes("good"));
        const hasSubmissionError =
          hasValidationError || onSubmitMode.includes("fail");

        for (let run = 1; run <= 3; ++run) {
          validator.mockImplementationOnce(variantGroups[0][validatorMode]);
          onValidate.mockImplementationOnce(variantGroups[1][onValidateMode]);
          onSubmit.mockImplementationOnce(variantGroups[2][onSubmitMode]);

          const form = screen.getByRole("form");
          fireEvent.submit(form);
          expect(validator).toHaveBeenCalledTimes(run);

          if (asyncValidation) {
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ validating: true }),
            );
            await new Promise((resolve) => process.nextTick(resolve));
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ validating: false }),
            );
          }

          await new Promise((resolve) => process.nextTick(resolve));

          expect(onValidate).toHaveBeenCalledTimes(run);

          if (hasValidationError) {
            expect(onSubmit).not.toHaveBeenCalled();
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ error }),
            );
          } else {
            expect(onSubmit).toHaveBeenCalledTimes(run);
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ error: null }),
            );

            if (asyncSubmission) {
              expect(contextSpy).toHaveBeenLastCalledWith(
                expect.objectContaining({ submitting: true }),
              );
              await new Promise((resolve) => setTimeout(resolve));
              expect(contextSpy).toHaveBeenLastCalledWith(
                expect.objectContaining({ submitting: false }),
              );
            }
          }

          await new Promise((resolve) => setTimeout(resolve));

          if (hasSubmissionError) {
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ error }),
            );
          } else {
            expect(contextSpy).toHaveBeenLastCalledWith(
              expect.objectContaining({ error: null }),
            );
          }
        }
      },
    );
  });
});
