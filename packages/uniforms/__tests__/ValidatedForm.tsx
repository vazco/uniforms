import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import SimpleSchema from 'simpl-schema';
import { ValidatedForm, context } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

import { render } from '../__suites__';
import mount from './_mount';

describe('ValidatedForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const onValidate = jest.fn((model, error) => error);
  const validator = jest.fn();
  const validatorForSchema = jest.fn(() => validator);

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

    test('validates (when `.validate` is called)', () => {
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

    test('correctly calls `validator`', () => {
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
    test('updates error state with errors from `validator`', async () => {
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

    test('correctly calls `onValidate` when validation succeeds', () => {
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

    test('correctly calls `onValidate` when validation fails ', () => {
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

    test('updates error state with async errors from `onValidate`', async () => {
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
            {context => (
              <>
                {context && context.error ? (
                  <p data-testid="error">{context.error.message}</p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');

      onValidate.mockImplementationOnce(() => error);

      fireEvent.submit(form);
      const errorElement = screen.getByTestId('error');

      expect(errorElement.innerHTML).toBe('test error message');
    });
    test('leaves error state alone when `onValidate` suppress `validator` errors', async () => {
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
            {context => (
              <>
                {context ? (
                  <p data-testid="error">
                    {JSON.stringify({ error: context.error })}
                  </p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      const errorContext = JSON.parse(screen.getByTestId('error').innerHTML);

      validator.mockImplementationOnce(() => {
        throw error;
      });
      onValidate.mockImplementationOnce(() => null);
      fireEvent.submit(form);

      expect(validator).toHaveBeenCalled();
      expect(onValidate).toHaveBeenCalled();
      expect(errorContext.error).toBe(null);
    });
    test('has `validating` context variable, default `false`', () => {
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
            {context => (
              <>
                {context ? (
                  <p data-testid="validating">
                    {JSON.stringify(context.validating)}
                  </p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );

      const validatingContext = JSON.parse(
        screen.getByTestId('validating').innerHTML,
      );

      expect(validatingContext).toBe(false);
    });

    test('uses `modelTransform`s `validate` mode', () => {
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
    test('calls `onSubmit` when validation succeeds', async () => {
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

    test('skips `onSubmit` when validation fails', async () => {
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
      // TODO: add role form to form html element
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).not.toBeCalled();
    });

    test('sets submitted to true, when form is submitted and validation succeeds', () => {
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
            {context => (
              <>
                {context ? (
                  <p data-testid="submitted">
                    {JSON.stringify(context.submitted)}
                  </p>
                ) : null}
              </>
            )}
          </context.Consumer>
        </ValidatedForm>,
        {
          schema: { type: SimpleSchema2Bridge },
        },
      );
      const form = screen.getByRole('form');
      const getSubmittedContext = () =>
        JSON.parse(screen.getByTestId('submitted').innerHTML);
      let submittedContext = getSubmittedContext();

      expect(submittedContext).toBe(false);

      fireEvent.submit(form);
      submittedContext = getSubmittedContext();

      expect(submittedContext).toBe(true);
    });

    test('sets submitted to true, when form is submitted and validation fails', () => {
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
            {context => (
              <>
                {context ? (
                  <p data-testid="submitted">
                    {JSON.stringify(context.submitted)}
                  </p>
                ) : null}
              </>
            )}
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
      const getSubmittedContext = () =>
        JSON.parse(screen.getByTestId('submitted').innerHTML);
      let submittedContext = getSubmittedContext();

      expect(submittedContext).toBe(false);

      fireEvent.submit(form);
      submittedContext = getSubmittedContext();

      expect(submittedContext).toBe(true);
    });

    test('updates error state with async errors from `onSubmit`', async () => {
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
            {context => (
              <>
                {context && context.error ? (
                  <p data-testid="error">{context.error.message}</p>
                ) : null}
              </>
            )}
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
      const errorMessage = screen.getByTestId('error').innerHTML;

      expect(onSubmit).toHaveBeenCalled();
      expect(errorMessage).toBe('test error message');
    });

    test('works if unmounts on submit', async () => {
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
      // TODO: add role form to form html element
      const form = screen.getByRole('form');
      onSubmit.mockImplementationOnce(() => unmount());
      fireEvent.submit(form);
      await new Promise(resolve => process.nextTick(resolve));
    });
  });

  describe('on change', () => {
    describe('in `onChange` mode', () => {
      test.skip('validates', () => {
        // FIXME: ValidatedForm is not a valid Component.
        render(
          <ValidatedForm
            // TODO: delete ts-expect-error error if this issue is resolved https://github.com/vazco/uniforms/issues/1165
            // @ts-expect-error
            name="form"
            schema={schema}
            model={model}
            onChange={onChange}
            validate="onChange"
          />,
          {
            schema: { type: SimpleSchema2Bridge },
          },
        );
        const form = screen.getByRole('form');
        fireEvent.change(form, onChange({ a: 2 }));
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe('in `onSubmit` mode', () => {
      it('does not validate', () => {
        // FIXME: ValidatedForm is not a valid Component.
        const wrapper = mount<ValidatedForm | any>(
          <ValidatedForm model={model} schema={schema} validate="onSubmit" />,
        );
        wrapper.instance().getContext().onChange('key', 'value');

        expect(validator).not.toHaveBeenCalled();
      });
    });

    describe('in `onChangeAfterSubmit` mode', () => {
      // FIXME: ValidatedForm is not a valid Component.
      let wrapper = mount<ValidatedForm | any>(
        <ValidatedForm
          model={model}
          schema={schema}
          validate="onChangeAfterSubmit"
        />,
      );

      beforeEach(() => {
        wrapper = mount<ValidatedForm | any>(
          <ValidatedForm
            model={model}
            schema={schema}
            validate="onChangeAfterSubmit"
          />,
        );
      });

      it('does not validates before submit', () => {
        wrapper.instance().getContext().onChange('key', 'value');
        expect(validator).not.toHaveBeenCalled();
      });

      it('validates after submit', async () => {
        wrapper.find('form').simulate('submit');
        await new Promise(resolve => process.nextTick(resolve));

        validator.mockClear();
        wrapper.instance().getContext().onChange('key', 'value');
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('on reset', () => {
    it('removes `error`', () => {
      // FIXME: ValidatedForm is not a valid Component.
      const wrapper = mount<ValidatedForm | any>(
        <ValidatedForm model={model} onSubmit={onSubmit} schema={schema} />,
      );
      validator.mockImplementationOnce(() => {
        throw new Error();
      });
      wrapper.find('form').simulate('submit');
      expect(wrapper.instance().getContext().error).toBeTruthy();

      wrapper.instance().reset();
      expect(wrapper.instance().getContext().error).toBeNull();
    });
  });

  describe('when props are changed', () => {
    const anotherModel = { x: 2 };

    describe('in `onChange` mode', () => {
      // FIXME: ValidatedForm is not a valid Component.
      let wrapper = mount<ValidatedForm | any>(
        <ValidatedForm model={model} schema={schema} validate="onChange" />,
      );

      beforeEach(() => {
        wrapper = mount<ValidatedForm | any>(
          <ValidatedForm model={model} schema={schema} validate="onChange" />,
        );
      });

      it('does not revalidate arbitrarily', () => {
        wrapper.setProps({ anything: 'anything' });
        expect(validator).not.toBeCalled();
      });

      it('revalidates if `model` changes', () => {
        wrapper.setProps({ model: anotherModel });
        expect(validator).toHaveBeenCalledTimes(1);
      });

      it('revalidates if `validator` changes', () => {
        wrapper.setProps({ validator: {} });
        expect(validator).toHaveBeenCalledTimes(1);
      });

      it('revalidate if `schema` changes', () => {
        wrapper.setProps({ schema: new SimpleSchema2Bridge(schema.schema) });
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe('in `onSubmit` mode', () => {
      // FIXME: ValidatedForm is not a valid Component.
      let wrapper = mount<ValidatedForm | any>(
        <ValidatedForm model={model} schema={schema} validate="onSubmit" />,
      );

      beforeEach(() => {
        wrapper = mount<ValidatedForm | any>(
          <ValidatedForm model={model} schema={schema} validate="onSubmit" />,
        );
      });

      it('does not revalidate when `model` changes', () => {
        wrapper.setProps({ model: {} });
        expect(validator).not.toBeCalled();
      });

      it('does not revalidate when validator `options` change', () => {
        wrapper.setProps({ validator: {} });
        expect(validator).not.toBeCalled();
      });

      it('does not revalidate when `schema` changes', () => {
        wrapper.setProps({ schema: new SimpleSchema2Bridge(schema.schema) });
        expect(validator).not.toBeCalled();
      });
    });

    describe('in any mode', () => {
      // FIXME: ValidatedForm is not a valid Component.
      let wrapper = mount<ValidatedForm | any>(
        <ValidatedForm model={model} schema={schema} />,
      );

      beforeEach(() => {
        wrapper = mount<ValidatedForm | any>(
          <ValidatedForm model={model} schema={schema} />,
        );
      });

      it('reuses the validator between validations', () => {
        ['1', '2', '3'].forEach(value => {
          wrapper.instance().getContext().onChange('key', value);
          wrapper.find('form').simulate('submit');
        });

        expect(validatorForSchema).toHaveBeenCalledTimes(1);
      });

      it('uses the new validator settings if `validator` changes', () => {
        const validatorA = Symbol();
        const validatorB = Symbol();

        wrapper.setProps({ validator: validatorA });
        expect(validatorForSchema).toHaveBeenCalledTimes(2);
        expect(validatorForSchema).toHaveBeenNthCalledWith(2, validatorA);

        wrapper.setProps({ validator: validatorB });
        expect(validatorForSchema).toHaveBeenCalledTimes(3);
        expect(validatorForSchema).toHaveBeenNthCalledWith(3, validatorB);

        wrapper.setProps({ validator: validatorA });
        expect(validatorForSchema).toHaveBeenCalledTimes(4);
        expect(validatorForSchema).toHaveBeenNthCalledWith(4, validatorA);
      });

      it('uses the new validator if `schema` changes', () => {
        const alternativeValidator = jest.fn();
        const alternativeSchema = new SimpleSchema2Bridge(schema.schema);
        jest
          .spyOn(alternativeSchema, 'getValidator')
          .mockImplementation(() => alternativeValidator);

        wrapper.setProps({ schema: alternativeSchema });
        wrapper.find('form').simulate('submit');

        expect(validator).not.toBeCalled();
        expect(alternativeValidator).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('validation flow', () => {
    const variantGroups = [
      {
        'fail-async': () => Promise.resolve(error),
        'fail-sync': () => error,
        'good-async': () => Promise.resolve(null),
        'good-async-silent': () => Promise.resolve(),
        'good-sync': () => null,
        'good-sync-silent': () => {},
      },
      {
        'fail-async': () => Promise.resolve(error),
        'fail-sync': () => error,
        'good-async': () => Promise.resolve(null),
        'good-async-silent': () => Promise.resolve(),
        'good-sync': () => null,
        'good-sync-silent': () => {},
        'pass-async': (_: string, error: any) => Promise.resolve(error),
        'pass-sync': (_: string, error: any) => error,
      },
      {
        'fail-async': () =>
          new Promise((_, reject) => setTimeout(() => reject(error))),
        'good-async': () =>
          new Promise(resolve => setTimeout(() => resolve('ok'))),
        'good-sync': () => 'ok',
      },
    ] as const;

    function cartesian<X, Y>(xs: X[], ys: Y[]) {
      return xs.reduce<[X, Y][]>(
        (xys, x) => ys.reduce((xys, y) => [...xys, [x, y]], xys),
        [],
      );
    }

    function keys<X>(x: X) {
      return Object.keys(x) as (keyof X)[];
    }

    const cases = cartesian(
      [true, false] as [true, false],
      cartesian(
        keys(variantGroups[0]),
        cartesian(keys(variantGroups[1]), keys(variantGroups[2])),
      ),
    );

    const alternativeSchema = new SimpleSchema2Bridge(schema.schema);
    alternativeSchema.getValidator = () => validator;

    function flatPair4<A, B, C, D>([a, [b, [c, d]]]: [A, [B, [C, D]]]) {
      return [a, b, c, d] as const;
    }

    it.each(cases.map(flatPair4))('works for %p/%p/%p/%p', async (...modes) => {
      const [hasError, validatorMode, onValidateMode, onSubmitMode] = modes;
      // FIXME: ValidatedForm is not a valid Component.
      const wrapper = mount<ValidatedForm | any>(
        <ValidatedForm
          error={hasError ? error : null}
          onSubmit={onSubmit}
          onValidate={onValidate}
          schema={alternativeSchema}
        />,
      );

      const asyncSubmission = onSubmitMode.includes('async');
      const asyncValidation =
        validatorMode.includes('async') || onValidateMode.includes('async');
      const hasValidationError =
        hasError ||
        (validatorMode.includes('good')
          ? onValidateMode.includes('fail')
          : !onValidateMode.includes('good'));
      const hasSubmissionError =
        hasValidationError || onSubmitMode.includes('fail');

      for (let run = 1; run <= 3; ++run) {
        validator.mockImplementationOnce(variantGroups[0][validatorMode]);
        onValidate.mockImplementationOnce(variantGroups[1][onValidateMode]);
        onSubmit.mockImplementationOnce(variantGroups[2][onSubmitMode]);

        const result = wrapper.instance().submit();
        expect(validator).toHaveBeenCalledTimes(run);

        if (asyncValidation) {
          expect(wrapper.instance().getContext().validating).toBe(true);
          await new Promise(resolve => process.nextTick(resolve));
          expect(wrapper.instance().getContext().validating).toBe(false);
        }

        await new Promise(resolve => process.nextTick(resolve));

        expect(onValidate).toHaveBeenCalledTimes(run);

        if (hasValidationError) {
          expect(onSubmit).toHaveBeenCalledTimes(0);
          expect(wrapper.instance().getContext().error).toBe(error);
        } else {
          expect(onSubmit).toHaveBeenCalledTimes(run);
          expect(wrapper.instance().getContext().error).toBe(null);

          if (asyncSubmission) {
            expect(wrapper.instance().getContext().submitting).toBe(true);
            await new Promise(resolve => setTimeout(resolve));
            expect(wrapper.instance().getContext().submitting).toBe(false);
          }
        }

        await new Promise(resolve => setTimeout(resolve));

        if (hasSubmissionError) {
          expect(wrapper.instance().getContext().error).toBe(error);
          await expect(result).rejects.toEqual(error);
        } else {
          expect(wrapper.instance().getContext().error).toBe(null);
          const submissionResult = asyncSubmission ? 'ok' : undefined;
          await expect(result).resolves.toEqual(submissionResult);
        }
      }
    });
  });
});
