import React from 'react';
import { ValidatedForm } from 'uniforms';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('ValidatedForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const onValidate = jest.fn((model, error) => error);
  const validator = jest.fn();
  const validatorForSchema = jest.fn(() => validator);

  const error = new Error();
  const model = { a: 1 };
  const schemaDefinition = {
    getDefinition() {},
    messageForError() {},
    objectKeys() {},
    validator: validatorForSchema,
  };
  const schema = new SimpleSchemaBridge(schemaDefinition as any);

  beforeEach(() => {
    onChange.mockClear();
    onSubmit.mockClear();
    onValidate.mockClear();
    validator.mockClear();
    validatorForSchema.mockClear();
  });

  describe('on validation', () => {
    // FIXME: ValidatedForm is not a valid Component.
    let wrapper = mount<ValidatedForm | any>(<ValidatedForm schema={schema} />);
    let form = wrapper.instance();

    beforeEach(() => {
      wrapper = mount<ValidatedForm>(
        <ValidatedForm model={model} schema={schema} onValidate={onValidate} />,
      );
      form = wrapper.instance();
    });

    it('validates (when `.validate` is called)', () => {
      form.validate();
      expect(validator).toHaveBeenCalledTimes(1);
    });

    it('correctly calls `validator`', () => {
      form.validate();
      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith(model);
    });

    it('updates error state with errors from `validator`', async () => {
      validator.mockImplementationOnce(() => {
        throw error;
      });

      form.validate();
      await new Promise(resolve => process.nextTick(resolve));

      expect(wrapper.instance().getContext().error).toBe(error);
    });

    it('correctly calls `onValidate` when validation succeeds', () => {
      form.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, null);
    });

    it('correctly calls `onValidate` when validation fails ', () => {
      validator.mockImplementationOnce(() => {
        throw error;
      });

      form.validate();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenLastCalledWith(model, error);
    });

    it('updates error state with async errors from `onValidate`', async () => {
      onValidate.mockImplementationOnce(() => error);

      form.validate();

      expect(wrapper.instance().getContext().error).toBe(error);
    });

    it('leaves error state alone when `onValidate` suppress `validator` errors', async () => {
      validator.mockImplementationOnce(() => {
        throw error;
      });
      onValidate.mockImplementationOnce(() => null);
      form.validate();

      expect(validator).toHaveBeenCalled();
      expect(onValidate).toHaveBeenCalled();
      expect(wrapper.instance().getContext()).not.toHaveProperty(
        'uniforms.error',
        error,
      );
    });

    it('has `validating` context variable, default `false`', () => {
      expect(wrapper.instance().getContext().validating).toBe(false);
    });

    it('uses `modelTransform`s `validate` mode', () => {
      const transformedModel = { b: 1 };
      const modelTransform = (mode: string, model: Record<string, any>) =>
        mode === 'validate' ? transformedModel : model;
      wrapper.setProps({ modelTransform });
      form.validate();
      expect(validator).toHaveBeenLastCalledWith(transformedModel);
      expect(onValidate).toHaveBeenLastCalledWith(transformedModel, null);
    });
  });

  describe('when submitted', () => {
    // FIXME: ValidatedForm is not a valid Component.
    let wrapper = mount<ValidatedForm | any>(
      <ValidatedForm
        model={model}
        schema={schema}
        onSubmit={onSubmit}
        onValidate={onValidate}
      />,
    );

    beforeEach(() => {
      wrapper = mount<ValidatedForm | any>(
        <ValidatedForm
          model={model}
          schema={schema}
          onSubmit={onSubmit}
          onValidate={onValidate}
        />,
      );
    });

    it('calls `onSubmit` when validation succeeds', async () => {
      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('skips `onSubmit` when validation fails', async () => {
      validator.mockImplementationOnce(() => {
        throw error;
      });
      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).not.toBeCalled();
    });

    it('sets submitted to true, when form is submitted and validation succeeds', () => {
      const instance = wrapper.instance();
      expect(instance.getContext().submitted).toBe(false);
      wrapper.find('form').simulate('submit');
      expect(instance.getContext().submitted).toBe(true);
    });

    it('sets submitted to true, when form is submitted and validation fails', () => {
      validator.mockImplementationOnce(() => {
        throw error;
      });
      const instance = wrapper.instance();
      expect(instance.getContext().submitted).toBe(false);
      wrapper.find('form').simulate('submit');
      expect(instance.getContext().submitted).toBe(true);
    });

    it('updates error state with async errors from `onSubmit`', async () => {
      onSubmit.mockImplementationOnce(() => Promise.reject(error));
      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalled();
      expect(wrapper.instance().getContext().error).toBe(error);
    });

    it('works if unmounts on submit', async () => {
      onSubmit.mockImplementationOnce(() => wrapper.unmount());
      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));
    });
  });

  describe('on change', () => {
    describe('in `onChange` mode', () => {
      it('validates', () => {
        // FIXME: ValidatedForm is not a valid Component.
        const wrapper = mount<ValidatedForm | any>(
          <ValidatedForm model={model} schema={schema} validate="onChange" />,
        );
        wrapper.instance().getContext().onChange('key', 'value');

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
        wrapper.setProps({
          schema: new SimpleSchemaBridge(schemaDefinition as any),
        });
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
        wrapper.setProps({
          schema: new SimpleSchemaBridge(schemaDefinition as any),
        });
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
        const alternativeSchema = new SimpleSchemaBridge({
          getDefinition() {},
          messageForError() {},
          objectKeys() {},
          validator: () => alternativeValidator,
        } as any);

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

    const schema = new SimpleSchemaBridge(schemaDefinition as any);
    schema.getValidator = () => validator;

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
          schema={schema}
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
