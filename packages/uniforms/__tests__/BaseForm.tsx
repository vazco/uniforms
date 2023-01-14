import { ReactWrapper } from 'enzyme';
import React from 'react';
import { BaseForm, Bridge, Context, useField } from 'uniforms';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('BaseForm', () => {
  const error = new Error();
  const model = { $: [1], _: 1 };
  const schema: Bridge = {
    getError() {},
    getErrorMessage: () => '',
    getErrorMessages: () => [],
    getField: () => ({}),
    getInitialValue() {},
    getProps: () => ({}),
    getSubfields: () => [],
    getType() {},
    getValidator: () => () => {},
  };

  const onChange = jest.fn();
  const onSubmit = jest.fn();

  afterEach(() => {
    onChange.mockClear();
    onSubmit.mockClear();
  });

  it('have correct context', () => {
    const wrapper = mount<BaseForm<any>>(
      <BaseForm error={error} model={model} schema={schema} />,
    );

    const context = wrapper.instance().getContext();
    expect(context).toEqual<Context<any>>({
      changed: false,
      changedMap: {},
      error,
      model,
      name: [],
      onChange: expect.any(Function),
      onSubmit: expect.any(Function),
      randomId: expect.any(Function),
      schema,
      state: {
        disabled: false,
        label: true,
        placeholder: false,
        readOnly: false,
        showInlineError: false,
      },
      submitted: false,
      submitting: false,
      validating: false,
      formRef: expect.any(BaseForm),
    });
  });

  describe('when rendered', () => {
    const wrapper = mount<BaseForm<any>>(
      <BaseForm
        disabled
        label={false}
        placeholder
        schema={schema}
        showInlineError
      >
        <div />
        <div />
        <div />
      </BaseForm>,
    );

    it('is <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1);
    });

    it('have correct props', () => {
      expect(wrapper.props()).toHaveProperty('noValidate', true);
    });

    it('have correct children', () => {
      expect(wrapper).toContainEqual(expect.anything());
      expect(wrapper.find('div')).toHaveLength(3);
    });

    it('have correct `resetCount`', () => {
      expect(wrapper.state('resetCount')).toBe(0);
    });

    it('have correct `state`', () => {
      const context = wrapper.instance().getContext();
      expect(context.state).toEqual<Context<any>['state']>({
        disabled: true,
        label: false,
        placeholder: true,
        readOnly: false,
        showInlineError: true,
      });
    });

    it('updates schema bridge', () => {
      const schema2 = { ...(schema as Omit<Bridge, never>), getType: () => {} };

      wrapper.setProps({ schema: schema2 });

      const context = wrapper.instance().getContext();

      expect(context).toHaveProperty('schema', schema2);
    });

    it('ignores changes made on first render', () => {
      function Field() {
        const [props] = useField('name', {});
        props.onChange(123);
        return null;
      }

      const wrapper = mount<BaseForm<any>>(
        <BaseForm onChange={onChange} schema={schema}>
          <Field />
        </BaseForm>,
      );

      const context = wrapper.instance().getContext();
      expect(context).toHaveProperty('changed', false);
      expect(context).toHaveProperty('changedMap', {});

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('name', 123);
    });
  });

  describe('when changed', () => {
    type Form = BaseForm<any>;
    let wrapper: ReactWrapper<Form['props'], Form['state'], Form>;

    beforeEach(() => {
      wrapper = mount(
        <BaseForm
          model={model}
          schema={schema}
          onChange={onChange}
          onSubmit={onSubmit}
        />,
      );
    });

    it('updates `changed` and `changedMap`', () => {
      const context1 = wrapper.instance().getContext();
      expect(context1).toHaveProperty('changed', false);
      expect(context1).toHaveProperty('changedMap', {});

      wrapper.instance().getContext().onChange('$', [1, 2]);

      const context2 = wrapper.instance().getContext();
      expect(context2).toHaveProperty('changed', true);
      expect(context2).toHaveProperty('changedMap.$');
      expect(context2.changedMap.$).toBeTruthy();
      expect(context2).toHaveProperty('changedMap.$.1');
      // @ts-expect-error: Dynamic `changedMap` structure.
      expect(context2.changedMap.$?.[1]).toBeTruthy();

      wrapper.instance().getContext().onChange('$', [1]);

      const context3 = wrapper.instance().getContext();
      expect(context3).toHaveProperty('changed', true);
      expect(context3).toHaveProperty('changedMap.$');
      expect(context3.changedMap.$).toBeTruthy();
      expect(context3).toHaveProperty('changedMap.$.1');
      // @ts-expect-error: Dynamic `changedMap` structure.
      expect(context3.changedMap.$?.[1]).toBeTruthy();
    });

    it('autosaves correctly (`autosave` = true)', async () => {
      wrapper.setProps({ autosave: true });
      wrapper.instance().getContext().onChange('a', 1);
      await new Promise(resolve => setTimeout(resolve));
      const context = wrapper.instance().getContext();
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(context.submitted).toBe(true);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves are not delayed', async () => {
      wrapper.setProps({ autosave: true });
      wrapper.instance().getContext().onChange('a', 1);
      await new Promise(resolve => setTimeout(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed', async () => {
      wrapper.setProps({ autosave: true, autosaveDelay: 25 });
      wrapper.instance().getContext().onChange('a', 1);
      wrapper.instance().getContext().onChange('a', 2);
      wrapper.instance().getContext().onChange('a', 3);
      await new Promise(resolve => setTimeout(resolve));

      expect(onSubmit).not.toHaveBeenCalled();

      await new Promise(resolve => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed (longer)', async () => {
      wrapper.setProps({ autosave: true, autosaveDelay: 10 });
      wrapper.instance().getContext().onChange('a', 1);
      wrapper.instance().getContext().onChange('a', 2);
      wrapper.instance().getContext().onChange('a', 3);

      await new Promise(resolve => setTimeout(resolve, 25));

      wrapper.instance().getContext().onChange('a', 1);
      wrapper.instance().getContext().onChange('a', 2);
      wrapper.instance().getContext().onChange('a', 3);

      await new Promise(resolve => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('clears autosave correctly', () => {
      wrapper.setProps({ autosave: true, autosaveDelay: 100 });
      wrapper.instance().getContext().onChange('a', 1);
      wrapper.unmount();

      expect(onSubmit).not.toBeCalled();
    });

    it('autosaves correctly (`autosave` = false)', () => {
      wrapper.setProps({ autosave: true });
      wrapper.setProps({ autosave: false });
      wrapper.instance().getContext().onChange('a', 1);

      expect(onSubmit).not.toBeCalled();
    });

    it('calls `onChange` with correct name and value', () => {
      wrapper.instance().getContext().onChange('a', 1);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('a', 1);
    });

    it('cancels `onChange` event', () => {
      wrapper.find('form').simulate('change');

      expect(onChange).not.toBeCalled();
    });

    it('does nothing without `onChange`', () => {
      wrapper.setProps({ onChange: undefined });
      wrapper.instance().getContext().onChange('a', 1);

      expect(onChange).not.toBeCalled();
    });
  });

  describe('when reset', () => {
    const createWrapper = () =>
      mount<BaseForm<any>>(
        <BaseForm model={model} schema={schema} onSubmit={onSubmit} />,
      );

    it('increase `resetCount`', () => {
      const wrapper = createWrapper();
      wrapper.instance().reset();

      expect(wrapper.state('resetCount')).toBe(1);
    });

    it('sets submitted back to false', async () => {
      const wrapper = createWrapper();
      const instance = wrapper.instance();
      expect(instance.getContext().submitted).toBe(false);
      wrapper.find('form').simulate('submit');
      expect(instance.getContext().submitted).toBe(true);
      instance.reset();
      expect(instance.getContext().submitted).toBe(false);
    });
  });

  describe('when submitted', () => {
    const createWrapper = () =>
      mount<BaseForm<any>>(
        <BaseForm model={model} schema={schema} onSubmit={onSubmit} />,
      );

    it('calls `onSubmit` once', () => {
      const wrapper = createWrapper();
      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('calls `onSubmit` with correct model', () => {
      const wrapper = createWrapper();
      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('calls `onSubmit` with the correctly `modelTransform`ed model', () => {
      const wrapper = createWrapper();
      wrapper.setProps({
        modelTransform(mode, model) {
          return mode === 'submit' ? { submit: 1 } : model;
        },
      });

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenLastCalledWith({ submit: 1 });

      wrapper.setProps({ modelTransform: undefined });
    });

    it('sets `submitted` to true', async () => {
      const wrapper = createWrapper();
      const instance = wrapper.instance();
      expect(instance.getContext().submitted).toBe(false);
      wrapper.find('form').simulate('submit');
      expect(instance.getContext().submitted).toBe(true);
    });

    it('sets `submitting` state while submitting', async () => {
      const wrapper = createWrapper();
      // FIXME: It should say `() => void`.
      let resolveSubmit: (...args: any[]) => void = () => {};
      wrapper.setProps({
        onSubmit: () => new Promise(resolve => (resolveSubmit = resolve)),
      });

      const context1 = wrapper.instance().getContext();
      expect(context1).toHaveProperty('submitting', false);

      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      const context2 = wrapper.instance().getContext();
      expect(context2).toHaveProperty('submitting', true);

      resolveSubmit();
      await new Promise(resolve => process.nextTick(resolve));

      const context3 = wrapper.instance().getContext();
      expect(context3).toHaveProperty('submitting', false);
    });

    it('ignores synchronous errors', async () => {
      const wrapper = createWrapper();
      const error = new Error();
      wrapper.setProps({
        onSubmit() {
          throw error;
        },
      });

      try {
        wrapper.instance().submit();
        throw new Error('Unreachable.');
      } catch (catched) {
        expect(catched).toBe(error);
      }
    });

    it('returns asynchronous results', async () => {
      const wrapper = createWrapper();
      const value = 42;
      wrapper.setProps({
        async onSubmit() {
          return value;
        },
      });

      await expect(wrapper.instance().submit()).resolves.toBe(value);
    });

    it('works when unmounted on submit', () => {
      const spy = jest.spyOn(console, 'error');
      const wrapper = createWrapper();
      onSubmit.mockImplementationOnce(async () => wrapper.unmount());
      wrapper.find('form').simulate('submit');

      expect(spy).not.toHaveBeenCalled();

      spy.mockRestore();
    });
  });
});
