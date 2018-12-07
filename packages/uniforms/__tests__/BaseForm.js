import React from 'react';
import {mount} from 'enzyme';

import BaseForm from 'uniforms/BaseForm';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('BaseForm', () => {
  const noop = () => {};
  const error = new Error();
  const model = {$: [1], _: 1};
  const schema = {
    getError: noop,
    getErrorMessage: noop,
    getErrorMessages: noop,
    getField: noop,
    getInitialValue: noop,
    getProps: noop,
    getSubfields: noop,
    getType: noop,
    getValidator: noop
  };

  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const onSubmitSuccess = jest.fn();
  const onSubmitFailure = jest.fn();

  afterEach(() => {
    onChange.mockReset();
    onSubmit.mockReset();
    onSubmitSuccess.mockReset();
    onSubmitFailure.mockReset();
  });

  describe('child context', () => {
    const wrapper = mount(<BaseForm error={error} model={model} schema={schema} />);

    const context = wrapper.instance().getChildContext();

    it('exists', () => {
      expect(context).toHaveProperty('uniforms', expect.any(Object));
    });

    it('have correct `error`', () => {
      expect(context.uniforms).toHaveProperty('error', error);
    });

    it('have correct `model`', () => {
      expect(context.uniforms).toHaveProperty('model', model);
    });

    it('have correct `name`', () => {
      expect(context.uniforms).toHaveProperty('name', expect.any(Array));
      expect(context.uniforms.name).toHaveLength(0);
    });

    it('have correct `schema`', () => {
      expect(context.uniforms).toHaveProperty('schema', schema);
    });

    it('have correct `state`', () => {
      expect(context.uniforms).toHaveProperty('state', expect.any(Object));
      expect(context.uniforms.state).toHaveProperty('changed', false);
      expect(context.uniforms.state).toHaveProperty('changedMap', {});
      expect(context.uniforms.state).toHaveProperty('submitting', false);
      expect(context.uniforms.state).toHaveProperty('label', true);
      expect(context.uniforms.state).toHaveProperty('disabled', false);
      expect(context.uniforms.state).toHaveProperty('placeholder', false);
      expect(context.uniforms.state).toHaveProperty('showInlineError', false);
    });

    it('have correct `onChange`', () => {
      expect(context.uniforms).toHaveProperty('onChange', expect.any(Function));
    });
  });

  describe('when rendered', () => {
    const wrapper = mount(
      <BaseForm className="name" disabled label={false} placeholder schema={schema} showInlineError>
        <div />
        <div />
        <div />
      </BaseForm>
    );

    it('is <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1);
    });

    it('have correct props', () => {
      expect(wrapper.props()).toHaveProperty('className', 'name');
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
      const context = wrapper.instance().getChildContext();

      expect(context.uniforms).toHaveProperty('state', expect.any(Object));
      expect(context.uniforms.state).toHaveProperty('label', false);
      expect(context.uniforms.state).toHaveProperty('disabled', true);
      expect(context.uniforms.state).toHaveProperty('placeholder', true);
      expect(context.uniforms.state).toHaveProperty('showInlineError', true);
    });

    it('updates schema bridge', () => {
      const schema2 = {...schema, getType: () => {}};

      wrapper.setProps({schema: schema2});

      const context = wrapper.instance().getChildContext();

      expect(context.uniforms).toHaveProperty('schema', schema2);
    });
  });

  describe('when changed', () => {
    const wrapper = mount(<BaseForm model={model} schema={schema} onChange={onChange} onSubmit={onSubmit} />);

    it('updates `changed` and `changedMap`', () => {
      const context1 = wrapper.instance().getChildContext().uniforms.state;
      expect(context1).toHaveProperty('changed', false);
      expect(context1).toHaveProperty('changedMap', {});

      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('$', [1, 2]);

      const context2 = wrapper.instance().getChildContext().uniforms.state;
      expect(context2).toHaveProperty('changed', true);
      expect(context2).toHaveProperty('changedMap.$');
      expect(context2.changedMap.$).toBeTruthy();
      expect(context2).toHaveProperty('changedMap.$.1');
      expect(context2.changedMap.$[1]).toBeTruthy();
    });

    it('autosaves correctly (`autosave` = true)', () => {
      wrapper.setProps({autosave: true});
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves are not delayed', () => {
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 2);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 3);

      expect(onSubmit).toHaveBeenCalledTimes(3);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed', async () => {
      wrapper.setProps({autosaveDelay: 10});
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 2);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 3);

      await new Promise(resolve => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves can be delayed (longer)', async () => {
      wrapper.setProps({autosaveDelay: 10});
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 2);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 3);

      await new Promise(resolve => setTimeout(resolve, 25));

      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 2);
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 3);

      await new Promise(resolve => setTimeout(resolve, 25));

      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onSubmit).toHaveBeenLastCalledWith(model);
    });

    it('autosaves correctly (`autosave` = false)', () => {
      wrapper.setProps({autosave: false});
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);

      expect(onSubmit).not.toBeCalled();
    });

    it('calls `onChange` with correct name and value', () => {
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('a', 1);
    });

    it('cancels `onChange` event', () => {
      wrapper.find('form').simulate('change');

      expect(onChange).not.toBeCalled();
    });

    it('does nothing without `onChange`', () => {
      wrapper.setProps({onChange: undefined});
      wrapper
        .instance()
        .getChildContext()
        .uniforms.onChange('a', 1);

      expect(onChange).not.toBeCalled();
    });
  });

  describe('when reset', () => {
    const wrapper = mount(<BaseForm schema={schema} />);

    it('increase `resetCount`', () => {
      wrapper.instance().reset();

      expect(wrapper.state('resetCount')).toBe(1);
    });
  });

  describe('when submitted', () => {
    const wrapper = mount(<BaseForm model={model} schema={schema} onSubmit={onSubmit} />);

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
          if (mode === 'submit') {
            return 1;
          }

          return model;
        }
      });

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenLastCalledWith(1);

      wrapper.setProps({modelTransform: undefined});
    });

    it('without `onSubmit` calls only `onSubmitSuccess`', async () => {
      wrapper.setProps({onSubmit: undefined, onSubmitSuccess, onSubmitFailure});
      wrapper.find('form').simulate('submit');

      await new Promise(resolve => process.nextTick(resolve));
      expect(onSubmit).not.toBeCalled();
      expect(onSubmitSuccess).toBeCalledTimes(1);
      expect(onSubmitFailure).not.toBeCalled();
    });

    it('sets `submitting` state while submitting', async () => {
      let resolveSubmit = null;
      wrapper.setProps({onSubmit: () => new Promise(resolve => (resolveSubmit = resolve))});

      const context1 = wrapper.instance().getChildContext().uniforms.state;
      expect(context1).toHaveProperty('submitting', false);

      wrapper.find('form').simulate('submit');
      await new Promise(resolve => process.nextTick(resolve));

      const context2 = wrapper.instance().getChildContext().uniforms.state;
      expect(context2).toHaveProperty('submitting', true);

      resolveSubmit();
      await new Promise(resolve => process.nextTick(resolve));

      const context3 = wrapper.instance().getChildContext().uniforms.state;
      expect(context3).toHaveProperty('submitting', false);
    });

    it('calls `onSubmitSuccess` with the returned value when `onSubmit` resolves', async () => {
      const onSubmitValue = 'value';
      onSubmit.mockReturnValueOnce(Promise.resolve(onSubmitValue));

      const wrapper = mount(
        <BaseForm model={model} schema={schema} onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      );

      wrapper.find('form').simulate('submit');

      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
      expect(onSubmitSuccess).toHaveBeenLastCalledWith(onSubmitValue);
    });

    it('calls `onSubmitFailure` with the thrown error when `onSubmit` rejects', async () => {
      const onSubmitError = 'error';
      onSubmit.mockReturnValueOnce(Promise.reject(onSubmitError));

      const wrapper = mount(
        <BaseForm model={model} schema={schema} onSubmit={onSubmit} onSubmitFailure={onSubmitFailure} />
      );

      wrapper.find('form').simulate('submit');

      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmitFailure).toHaveBeenCalledTimes(1);
      expect(onSubmitFailure).toHaveBeenLastCalledWith(onSubmitError);
    });
  });
});
