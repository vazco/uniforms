import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SimpleSchema from 'simpl-schema';
import { ValidatedForm, context, useForm } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoField } from 'uniforms-unstyled';

import { render } from '../__suites__';

describe('ValidatedForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const onValidate = jest.fn((model, error) => error);
  const validator = jest.fn();
  const validatorForSchema = jest.fn(() => validator);
  const mockContext = jest.fn();

  const error = new Error('test error message');
  const model = { a: 1 };
  const schema = new SimpleSchema2Bridge(
    new SimpleSchema({
      a: { type: String, defaultValue: '' },
      b: { type: String, defaultValue: '' },
      c: { type: String, defaultValue: '' },
    }),
  );
  jest.spyOn(schema.schema, 'validator').mockImplementation(validatorForSchema);

  beforeEach(() => jest.clearAllMocks());

  describe('on validation', () => {
    // FIXME: ValidatedForm is not a valid Component.

    it('validates (when `.validate` is called)', () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      expect(validator).toHaveBeenCalledTimes(1);
    });

    it('correctly calls `validator`', () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith(model);
    });
    it('updates error state with errors from `validator`', async () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      validator.mockImplementationOnce(() => {
        throw error;
      });

      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(onValidate).toHaveBeenLastCalledWith(model, error);
    });

    it('correctly calls `onValidate` when validation succeeds', () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      fireEvent.submit(form);
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, null);
    });

    it('correctly calls `onValidate` when validation fails ', () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
          data-testid="validateForm"
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      validator.mockImplementationOnce(() => {
        throw error;
      });

      fireEvent.submit(form);

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, error);
    });

    it('updates error state with async errors from `onValidate`', async () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer>
            {context => mockContext(context?.error)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      onValidate.mockImplementationOnce(() => error);

      fireEvent.submit(form);

      expect(mockContext).toHaveBeenLastCalledWith(error);
    });
    it('leaves error state alone when `onValidate` suppress `validator` errors', async () => {
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer>
            {context => mockContext(context?.error)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      validator.mockImplementationOnce(() => {
        throw error;
      });
      onValidate.mockImplementationOnce(() => null);
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalled();
      expect(onValidate).toHaveBeenCalled();
      expect(mockContext).toHaveBeenLastCalledWith(null);
    });
    it('has `validating` context variable, default `false`', () => {
      render(
        <ValidatedForm
          schema={schema}
          model={model}
          onValidate={onValidate}
          validator={validator}
        >
          <context.Consumer>
            {context => mockContext(context?.validating)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      expect(mockContext).toHaveBeenCalledWith(false);
    });

    it('uses `modelTransform`s `validate` mode', () => {
      const transformedModel = { b: 1 };
      const modelTransform = (mode: string, model: Record<string, any>) =>
        mode === 'validate' ? transformedModel : model;
      render(
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          modelTransform={modelTransform}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      expect(validator).toHaveBeenLastCalledWith(transformedModel);
      expect(onValidate).toHaveBeenLastCalledWith(transformedModel, null);
    });
  });

  describe('when submitted', () => {
    it('calls `onSubmit` when validation succeeds', async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const form = screen.getByRole('form');
      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('skips `onSubmit` when validation fails', async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole('form');
      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).not.toBeCalled();
    });

    it('sets submitted to true, when form is submitted and validation succeeds', () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer>
            {context => mockContext(context?.submitted)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      expect(mockContext).toHaveBeenLastCalledWith(false);

      fireEvent.submit(form);

      expect(mockContext).toHaveBeenLastCalledWith(true);
    });

    it('sets submitted to true, when form is submitted and validation fails', () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer>
            {context => mockContext(context?.submitted)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole('form');

      expect(mockContext).toHaveBeenLastCalledWith(false);

      fireEvent.submit(form);

      expect(mockContext).toHaveBeenLastCalledWith(true);
    });

    it('updates error state with async errors from `onSubmit`', async () => {
      render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <context.Consumer>
            {context => mockContext(context?.error)}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      onSubmit.mockImplementationOnce(() => Promise.reject(error));
      const form = screen.getByRole('form');

      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalled();
      expect(mockContext).toHaveBeenLastCalledWith(error);
    });

    it('works if unmounts on submit', async () => {
      const { unmount } = render(
        // FIXME: ValidatedForm is not a valid Component.
        <ValidatedForm
          // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
          // @ts-expect-error
          name="form"
          schema={schema}
          model={model}
          onValidate={onValidate}
          onSubmit={onSubmit}
        />,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      onSubmit.mockImplementationOnce(() => unmount());
      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));
    });
  });

  describe('on change', () => {
    describe('in `onChange` mode', () => {
      it('validates', () => {
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
          {
            schema: { type: SimpleSchema2Bridge },
          },
        );
        const input = screen.getByLabelText('A');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe('in `onSubmit` mode', () => {
      it('does not validate', () => {
        // FIXME: ValidatedForm is not a valid Component.
        render(
          <ValidatedForm model={model} schema={schema} validate="onSubmit">
            <AutoField name="a" />
          </ValidatedForm>,
          {
            schema: { type: SimpleSchema2Bridge },
          },
        );
        const input = screen.getByLabelText('A');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(validator).not.toHaveBeenCalled();
      });
    });

    describe('in `onChangeAfterSubmit` mode', () => {
      it('does not validates before submit', () => {
        render(
          // FIXME: ValidatedForm is not a valid Component.
          <ValidatedForm
            model={model}
            schema={schema}
            validate="onChangeAfterSubmit"
          >
            <AutoField name="a" />
          </ValidatedForm>,
          {
            schema: { type: SimpleSchema2Bridge },
          },
        );
        const input = screen.getByLabelText('A');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(validator).not.toHaveBeenCalled();
      });

      it('validates after submit', async () => {
        render(
          // FIXME: ValidatedForm is not a valid Component.
          <ValidatedForm
            // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
            // @ts-expect-error
            name="form"
            model={model}
            schema={schema}
            validate="onChangeAfterSubmit"
          >
            <AutoField name="a" />
          </ValidatedForm>,
          {
            schema: { type: SimpleSchema2Bridge },
          },
        );

        const form = screen.getByRole('form');
        fireEvent.submit(form);
        await new Promise(resolve => process.nextTick(resolve));

        validator.mockClear();
        const input = screen.getByLabelText('A');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(validator).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('on reset', () => {
    it('removes `error`', async () => {
      const FormControls = () => {
        const { formRef } = useForm();

        return (
          <>
            <button onClick={() => formRef.reset()}>Reset</button>
          </>
        );
      };

      const Component = () => (
        // FIXME: ValidatedForm is not a valid Component.
        // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
        <ValidatedForm
          // @ts-expect-error
          name="form"
          model={model}
          onSubmit={onSubmit}
          schema={schema}
        >
          <context.Consumer>
            {context => mockContext(context?.error)}
          </context.Consumer>
          <FormControls />
        </ValidatedForm>
      );

      render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      validator.mockImplementationOnce(() => {
        throw error;
      });

      const form = screen.getByRole('form');
      const resetButton = screen.getByText('Reset');

      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(mockContext).toHaveBeenLastCalledWith(error);

      fireEvent.click(resetButton);
      await new Promise(resolve => process.nextTick(resolve));
      expect(mockContext).toHaveBeenLastCalledWith(null);
    });
  });

  describe('when props are changed', () => {
    const anotherModel = { x: 2 };

    // FIXME: ValidatedForm is not a valid Component.
    const Component = (props: any) => (
      <ValidatedForm
        model={model}
        schema={schema}
        validate="onChange"
        {...props}
      />
    );

    it('does not revalidate arbitrarily', () => {
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component anything="anything" />);
      expect(validator).not.toBeCalled();
    });

    it('revalidates if `model` changes', () => {
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component model={anotherModel} />);
      expect(validator).toHaveBeenCalledTimes(1);
    });

    it('revalidates if `validator` changes', () => {
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component validator={{}} />);
      expect(validator).toHaveBeenCalledTimes(1);
    });

    it('revalidate if `schema` changes', () => {
      const anotherSchema = new SimpleSchema2Bridge(schema.schema);
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component schema={anotherSchema} />);
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });

  describe('in `onSubmit` mode', () => {
    // FIXME: ValidatedForm is not a valid Component.
    const Component = (props: any) => (
      <ValidatedForm
        model={model}
        schema={schema}
        validate="onSubmit"
        {...props}
      />
    );

    it('does not revalidate when `model` changes', () => {
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component model={{}} />);
      expect(validator).not.toBeCalled();
    });

    it('does not revalidate when validator `options` change', () => {
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component validator={{}} />);
      expect(validator).not.toBeCalled();
    });

    it('does not revalidate when `schema` changes', () => {
      const anotherSchema = new SimpleSchema2Bridge(schema.schema);
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      rerender(<Component schema={anotherSchema} />);
      expect(validator).not.toBeCalled();
    });
  });

  describe('in any mode', () => {
    // FIXME: ValidatedForm is not a valid Component.
    const Component = (props: any) => (
      <ValidatedForm
        // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
        name="form"
        model={model}
        schema={schema}
        {...props}
      >
        <AutoField name="a" />
      </ValidatedForm>
    );

    it('reuses the validator between validations', () => {
      render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });
      ['1', '2', '3'].forEach(value => {
        const form = screen.getByRole('form');
        const input = screen.getByLabelText('A');
        fireEvent.change(input, { target: { value } });
        fireEvent.submit(form);
      });

      expect(validatorForSchema).toHaveBeenCalledTimes(1);
    });

    it('uses the new validator settings if `validator` changes', () => {
      const validatorA = Symbol();
      const validatorB = Symbol();
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component validator={validatorA} />);
      expect(validatorForSchema).toHaveBeenCalledTimes(2);
      expect(validatorForSchema).toHaveBeenNthCalledWith(2, validatorA);

      rerender(<Component validator={validatorB} />);
      expect(validatorForSchema).toHaveBeenCalledTimes(3);
      expect(validatorForSchema).toHaveBeenNthCalledWith(3, validatorB);

      rerender(<Component validator={validatorA} />);
      expect(validatorForSchema).toHaveBeenCalledTimes(4);
      expect(validatorForSchema).toHaveBeenNthCalledWith(4, validatorA);
    });

    it('uses the new validator if `schema` changes', () => {
      const alternativeValidator = jest.fn();
      const alternativeSchema = new SimpleSchema2Bridge(schema.schema);
      jest
        .spyOn(alternativeSchema, 'getValidator')
        .mockImplementation(() => alternativeValidator);
      const { rerender } = render(<Component />, {
        schema: { type: SimpleSchema2Bridge },
      });

      rerender(<Component schema={alternativeSchema} />);
      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(validator).not.toBeCalled();
      expect(alternativeValidator).toHaveBeenCalledTimes(1);
    });
  });
});

// describe('validation flow', () => {
//   const variantGroups = [
//     {
//       'fail-async': () => Promise.resolve(error),
//       'fail-sync': () => error,
//       'good-async': () => Promise.resolve(null),
//       'good-async-silent': () => Promise.resolve(),
//       'good-sync': () => null,
//       'good-sync-silent': () => {},
//     },
//     {
//       'fail-async': () => Promise.resolve(error),
//       'fail-sync': () => error,
//       'good-async': () => Promise.resolve(null),
//       'good-async-silent': () => Promise.resolve(),
//       'good-sync': () => null,
//       'good-sync-silent': () => {},
//       'pass-async': (_: string, error: any) => Promise.resolve(error),
//       'pass-sync': (_: string, error: any) => error,
//     },
//     {
//       'fail-async': () =>
//         new Promise((_, reject) => setTimeout(() => reject(error))),
//       'good-async': () =>
//         new Promise(resolve => setTimeout(() => resolve('ok'))),
//       'good-sync': () => 'ok',
//     },
//   ] as const;
//
//   function cartesian<X, Y>(xs: X[], ys: Y[]) {
//     return xs.reduce<[X, Y][]>(
//       (xys, x) => ys.reduce((xys, y) => [...xys, [x, y]], xys),
//       [],
//     );
//   }
//
//   function keys<X>(x: X) {
//     return Object.keys(x) as (keyof X)[];
//   }
//
//   const cases = cartesian(
//     [true, false] as [true, false],
//     cartesian(
//       keys(variantGroups[0]),
//       cartesian(keys(variantGroups[1]), keys(variantGroups[2])),
//     ),
//   );
//
//   const alternativeSchema = new SimpleSchema2Bridge(schema.schema);
//   alternativeSchema.getValidator = () => validator;
//
//   function flatPair4<A, B, C, D>([a, [b, [c, d]]]: [A, [B, [C, D]]]) {
//     return [a, b, c, d] as const;
//   }
//
//   it.each(cases.map(flatPair4))('works for %p/%p/%p/%p', async (...modes) => {
//     const [hasError, validatorMode, onValidateMode, onSubmitMode] = modes;
//     // FIXME: ValidatedForm is not a valid Component.
//     const wrapper = mount<ValidatedForm | any>(
//       <ValidatedForm
//         error={hasError ? error : null}
//         onSubmit={onSubmit}
//         onValidate={onValidate}
//         schema={alternativeSchema}
//       />,
//     );
//
//     const asyncSubmission = onSubmitMode.includes('async');
//     const asyncValidation =
//       validatorMode.includes('async') || onValidateMode.includes('async');
//     const hasValidationError =
//       hasError ||
//       (validatorMode.includes('good')
//         ? onValidateMode.includes('fail')
//         : !onValidateMode.includes('good'));
//     const hasSubmissionError =
//       hasValidationError || onSubmitMode.includes('fail');
//
//     for (let run = 1; run <= 3; ++run) {
//       validator.mockImplementationOnce(variantGroups[0][validatorMode]);
//       onValidate.mockImplementationOnce(variantGroups[1][onValidateMode]);
//       onSubmit.mockImplementationOnce(variantGroups[2][onSubmitMode]);
//
//       const result = wrapper.instance().submit();
//       expect(validator).toHaveBeenCalledTimes(run);
//
//       if (asyncValidation) {
//         expect(wrapper.instance().getContext().validating).toBe(true);
//         await new Promise(resolve => process.nextTick(resolve));
//         expect(wrapper.instance().getContext().validating).toBe(false);
//       }
//
//       await new Promise(resolve => process.nextTick(resolve));
//
//       expect(onValidate).toHaveBeenCalledTimes(run);
//
//       if (hasValidationError) {
//         expect(onSubmit).not.toHaveBeenCalled();
//         expect(wrapper.instance().getContext().error).toBe(error);
//       } else {
//         expect(onSubmit).toHaveBeenCalledTimes(run);
//         expect(wrapper.instance().getContext().error).toBe(null);
//
//         if (asyncSubmission) {
//           expect(wrapper.instance().getContext().submitting).toBe(true);
//           await new Promise(resolve => setTimeout(resolve));
//           expect(wrapper.instance().getContext().submitting).toBe(false);
//         }
//       }
//
//       await new Promise(resolve => setTimeout(resolve));
//
//       if (hasSubmissionError) {
//         expect(wrapper.instance().getContext().error).toBe(error);
//         await expect(result).rejects.toEqual(error);
//       } else {
//         expect(wrapper.instance().getContext().error).toBe(null);
//         const submissionResult = asyncSubmission ? 'ok' : undefined;
//         await expect(result).resolves.toEqual(submissionResult);
//       }
//     }
//   });
// });
