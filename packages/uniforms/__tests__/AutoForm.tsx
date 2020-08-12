import React from 'react';
import { AutoForm, connectField } from 'uniforms';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('AutoForm', () => {
  const onChangeModel = jest.fn();
  const validator = jest.fn();
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const model = { a: '1' };
  const schema = new SimpleSchemaBridge({
    getDefinition: () => ({ type: String, defaultValue: '' }),
    messageForError: () => {},
    objectKeys: () => ['a', 'b', 'c'],
    validator: () => validator,
  } as any);

  beforeEach(() => {
    onChange.mockClear();
    onChangeModel.mockClear();
    onSubmit.mockClear();
    validator.mockClear();
  });

  describe('when changed', () => {
    it('updates', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm onChange={onChange} schema={schema} />,
      );

      wrapper.instance().getContext().onChange('a', '2');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('a', '2');
    });

    it('validates', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm onChange={onChange} schema={schema} />,
      );

      wrapper.instance().submit();

      expect(validator).toHaveBeenCalledTimes(1);
      expect(validator).toHaveBeenLastCalledWith({});

      wrapper.instance().getContext().onChange('a', '1');

      expect(validator).toHaveBeenCalledTimes(2);
      expect(validator).toHaveBeenLastCalledWith({ a: '1' });
    });

    it('calls `onChangeModel`', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm onChangeModel={onChangeModel} schema={schema} />,
      );

      wrapper.instance().getContext().onChange('a', '2');

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: '2' });
    });

    it('updates `changed` and `changedMap`', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(<AutoForm schema={schema} />);

      const context1 = wrapper.instance().getContext();
      expect(context1).toHaveProperty('changed', false);
      expect(context1).toHaveProperty('changedMap', {});

      wrapper.instance().getContext().onChange('a', '2');

      const context2 = wrapper.instance().getContext();
      expect(context2).toHaveProperty('changed', true);
      expect(context2).toHaveProperty('changedMap.a');
      expect(context2.changedMap.a).toBeTruthy();
    });
  });

  describe('when rendered', () => {
    it('calls `onChange` before render', () => {
      const field = () => null;
      const Field = connectField(field);

      // FIXME: AutoForm is not a valid Component.
      mount<AutoForm | any>(
        <AutoForm
          autoField={Field}
          model={model}
          onChange={onChange}
          schema={schema}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[0]).toEqual(expect.arrayContaining(['b', '']));
      expect(onChange.mock.calls[1]).toEqual(expect.arrayContaining(['c', '']));
    });

    it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm autosave onSubmit={onSubmit} schema={schema} />,
      );

      expect(onSubmit).not.toBeCalled();
      wrapper.instance().getContext().onChange('a', 1);

      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: 1 });
    });
  });

  describe('when reset', () => {
    it('reset `model`', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm autosave model={model} schema={schema} />,
      );

      wrapper.instance().reset();
      expect(wrapper.instance().getContext().model).toEqual(model);
    });

    it('resets state `changedMap`', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm autosave model={model} onSubmit={onSubmit} schema={schema} />,
      );

      wrapper.instance().reset();
      expect(wrapper.instance().getContext().changedMap).toEqual({});
    });

    it('resets state `changed`', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(
        <AutoForm autosave model={model} onSubmit={onSubmit} schema={schema} />,
      );

      wrapper.instance().reset();
      expect(wrapper.instance().getContext().changed).toEqual(false);
    });
  });

  describe('when updated', () => {
    it('updates', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(<AutoForm schema={schema} />);

      wrapper.setProps({ model: {} });
      expect(wrapper.instance().props.model).toEqual({});
    });

    it('validates', () => {
      // FIXME: AutoForm is not a valid Component.
      const wrapper = mount<AutoForm | any>(<AutoForm schema={schema} />);

      wrapper.setProps({ model, validate: 'onChange' });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
