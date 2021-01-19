import React from 'react';
import { BaseForm, Bridge } from 'uniforms';

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
    getField() {},
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
    expect(context).toEqual({
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
        showInlineError: false,
      },
      submitting: false,
      validating: false,
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
      expect(context.state).toEqual({
        disabled: true,
        label: false,
        placeholder: true,
        showInlineError: true,
      });
    });

    it('updates schema bridge', () => {
      const schema2 = { ...(schema as Omit<Bridge, never>), getType: () => {} };

      wrapper.setProps({ schema: schema2 });

      const context = wrapper.instance().getContext();

      expect(context).toHaveProperty('schema', schema2);
    });
  });

  describe('when changed', () => {
    const wrapper = mount<BaseForm<any>>(
      <BaseForm
        model={model}
        schema={schema}
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

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
      // @ts-ignore: Dynamic `changedMap` structure.
      expect(context2.changedMap.$?.[1]).toBeTruthy();
    });

    it('autosaves correctly (`autosave` = true)', async () => {
      wrapper.setProps({ autosave: true });
      wrapper.instance().getContext().onChange('a', 1);
      await new Promise(resolve => setTimeout(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves are not delayed', async () => {
      wrapper.instance().getContext().onChange('a', 1);
      await new Promise(resolve => setTimeout(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed', async () => {
      wrapper.setProps({ autosaveDelay: 25 });
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
      wrapper.setProps({ autosaveDelay: 10 });
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

    it('autosaves correctly (`autosave` = false)', () => {
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
    const wrapper = mount<BaseForm<any>>(<BaseForm schema={schema} />);

    it('increase `resetCount`', () => {
      wrapper.instance().reset();

      expect(wrapper.state('resetCount')).toBe(1);
    });
  });

  describe('when submitted', () => {
    const wrapper = mount<BaseForm<any>>(
      <BaseForm model={model} schema={schema} onSubmit={onSubmit} />,
    );

    it('calls `onSubmit` once', () => {
      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('calls `onSubmit` with correct model', () => {
      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('calls `onSubmit` with the correctly `modelTransform`ed model', () => {
      wrapper.setProps({
        modelTransform(mode, model) {
          return mode === 'submit' ? { submit: 1 } : model;
        },
      });

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenLastCalledWith({ submit: 1 });

      wrapper.setProps({ modelTransform: undefined });
    });

    it('sets `submitting` state while submitting', async () => {
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
      const value = 42;
      wrapper.setProps({
        async onSubmit() {
          return value;
        },
      });

      await expect(wrapper.instance().submit()).resolves.toBe(value);
    });
  });
});
