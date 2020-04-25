import React from 'react';
import { ReactWrapper } from 'enzyme';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';
import { ValidatedForm } from 'uniforms';

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
  const schema = new SimpleSchemaBridge(schemaDefinition);

  beforeEach(() => {
    onChange.mockClear();
    onSubmit.mockClear();
    onValidate.mockClear();
    validator.mockClear();
    validatorForSchema.mockClear();
  });

  describe('on validation', () => {
    let wrapper = mount<ValidatedForm>(<ValidatedForm schema={schema} />);
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

    it('sets `validating` `true` while validating', async () => {
      let resolveValidation = () => {};
      onValidate.mockImplementationOnce(
        () => new Promise(resolve => (resolveValidation = resolve)),
      );

      form.validate();
      await new Promise(resolve => process.nextTick(resolve));
      expect(wrapper.instance().getContext().validating).toBe(true);
      expect(onValidate).toHaveBeenCalledTimes(1);

      resolveValidation();
      await new Promise(resolve => process.nextTick(resolve));
      expect(wrapper.instance().getContext().validating).toBe(false);
    });

    it('uses `modelTransform`s `validate` mode', () => {
      const transformedModel = { b: 1 };
      const modelTransform = (mode, model) =>
        mode === 'validate' ? transformedModel : model;
      wrapper.setProps({ modelTransform });
      form.validate();
      expect(validator).toHaveBeenLastCalledWith(transformedModel);
      expect(onValidate).toHaveBeenLastCalledWith(transformedModel, null);
    });
  });

  describe('when submitted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount<ValidatedForm>(
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

    it('updates error state with async errors from `onSubmit`', async () => {
      onSubmit.mockImplementationOnce(() => Promise.reject(error));
      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalled();
      expect(wrapper.instance().getContext().error).toBe(error);
    });

    it('sets `submitting` during  `onSubmit`', async () => {
      let resolveSubmit = () => {};
      onSubmit.mockImplementationOnce(
        () => new Promise(resolve => (resolveSubmit = resolve)),
      );

      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));
      expect(wrapper.instance().getContext().submitting).toBe(true);

      expect(onValidate).toHaveBeenCalledTimes(1);
      resolveSubmit();

      await new Promise(resolve => process.nextTick(resolve));
      expect(wrapper.instance().getContext().submitting).toBe(false);
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
        const wrapper = mount<ValidatedForm>(
          <ValidatedForm model={model} schema={schema} validate="onChange" />,
        );
        wrapper.instance().getContext().onChange('key', 'value');

        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe('in `onSubmit` mode', () => {
      it('does not validate', () => {
        const wrapper = mount<ValidatedForm>(
          <ValidatedForm model={model} schema={schema} validate="onSubmit" />,
        );
        wrapper.instance().getContext().onChange('key', 'value');

        expect(validator).not.toHaveBeenCalled();
      });
    });

    describe('in `onChangeAfterSubmit` mode', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount<ValidatedForm>(
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
      const wrapper = mount<ValidatedForm>(
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
      let wrapper;
      beforeEach(() => {
        wrapper = mount<ValidatedForm>(
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
        wrapper.setProps({ schema: new SimpleSchemaBridge(schemaDefinition) });
        expect(validator).toHaveBeenCalledTimes(1);
      });
    });

    describe('in `onSubmit` mode', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount<ValidatedForm>(
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
        wrapper.setProps({ schema: new SimpleSchemaBridge(schemaDefinition) });
        expect(validator).not.toBeCalled();
      });
    });

    describe('in any mode', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount<ValidatedForm>(
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
        });

        wrapper.setProps({ schema: alternativeSchema });
        wrapper.find('form').simulate('submit');

        expect(validator).not.toBeCalled();
        expect(alternativeValidator).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('validation flow', () => {
    beforeAll(jest.useFakeTimers);
    afterAll(jest.useRealTimers);

    const variantGroups = [
      {
        'fail async': () => Promise.resolve(error),
        'fail  sync': () => error,
        'good async': () => Promise.resolve(null),
        'good  sync': () => null,
      },
      {
        'fail async': () => Promise.resolve(error),
        'fail  sync': () => error,
        'good async': () => Promise.resolve(null),
        'good  sync': () => null,
        'pass async': (_, error) => Promise.resolve(error),
        'pass  sync': (_, error) => error,
      },
      {
        'fail async': () =>
          new Promise((_, reject) => setTimeout(() => reject(error))),
        'good async': () => new Promise(resolve => setTimeout(resolve)),
        'good  sync': () => {},
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
      keys(variantGroups[0]),
      cartesian(keys(variantGroups[1]), keys(variantGroups[2])),
    ).map(([x, [y, z]]) => [x, y, z] as const);

    const schema = new SimpleSchemaBridge(schemaDefinition);
    schema.getValidator = () => validator;

    it.each(cases)('works for %p/%p/%p', async (...modes) => {
      const wrapper = mount<ValidatedForm>(
        <ValidatedForm
          onSubmit={onSubmit}
          onValidate={onValidate}
          schema={schema}
        />,
      );

      const [validatorMode, onValidateMode, onSubmitMode] = modes;
      validator.mockImplementationOnce(variantGroups[0][validatorMode]);
      onValidate.mockImplementationOnce(variantGroups[1][onValidateMode]);
      onSubmit.mockImplementationOnce(variantGroups[2][onSubmitMode]);

      const asyncSubmission = onSubmitMode.includes('async');
      const asyncValidation =
        validatorMode.includes('async') || onValidateMode.includes('async');
      const hasValidationError = validatorMode.includes('good')
        ? onValidateMode.includes('fail')
        : !onValidateMode.includes('good');
      const hasSubmissionError =
        hasValidationError || onSubmitMode.includes('fail');

      wrapper.instance().submit();
      expect(validator).toHaveBeenCalledTimes(1);

      if (asyncValidation) {
        expect(wrapper.instance().getContext().validating).toBe(true);
        await new Promise(resolve => process.nextTick(resolve));
        expect(wrapper.instance().getContext().validating).toBe(false);
      }

      await new Promise(resolve => process.nextTick(resolve));

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledTimes(hasValidationError ? 0 : 1);
      expect(wrapper.instance().getContext().error).toBe(
        hasValidationError ? error : null,
      );

      if (!hasValidationError && asyncSubmission) {
        expect(wrapper.instance().getContext().submitting).toBe(true);
        jest.runAllTimers();
        await new Promise(resolve => process.nextTick(resolve));
        expect(wrapper.instance().getContext().submitting).toBe(false);
      }

      expect(wrapper.instance().getContext().error).toBe(
        hasSubmissionError ? error : null,
      );
    });
  });
});
