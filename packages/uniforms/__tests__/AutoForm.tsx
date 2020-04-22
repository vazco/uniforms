import React from 'react';
import { AutoForm, connectField } from 'uniforms';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('AutoForm', () => {
  const onChangeModel = jest.fn();
  const validator = jest.fn(() => Promise.resolve());
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const model = { a: '1' };
  const schema = new SimpleSchemaBridge({
    getDefinition: () => ({ type: String, defaultValue: '' }),
    messageForError: () => {},
    objectKeys: () => ['a', 'b', 'c'],
    validator: () => validator,
  });

  beforeEach(() => {
    onChange.mockClear();
    onChangeModel.mockClear();
    onSubmit.mockClear();
    validator.mockClear();
  });

  describe('when changed', () => {
    const wrapper = mount<AutoForm>(
      <AutoForm
        onChange={onChange}
        onChangeModel={onChangeModel}
        schema={schema}
      />,
    );

    it('updates', () => {
      wrapper.instance().getContext().onChange('a', '2');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('a', '2');
    });

    it('calls `onChangeModel`', () => {
      wrapper.instance().getContext().onChange('a', '2');

      expect(onChangeModel).toHaveBeenCalledTimes(1);
      expect(onChangeModel).toHaveBeenLastCalledWith({ a: '2' });
    });
  });

  describe('when rendered', () => {
    it('calls `onChange` before render', () => {
      const field = () => null;
      const Field = connectField(field);

      mount<AutoForm>(
        <AutoForm
          onChange={onChange}
          schema={schema}
          autoField={Field}
          model={model}
        />,
      );

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[0]).toEqual(expect.arrayContaining(['b', '']));
      expect(onChange.mock.calls[1]).toEqual(expect.arrayContaining(['c', '']));
    });

    it('skips `onSubmit` until rendered (`autosave` = true)', async () => {
      const wrapper = mount<AutoForm>(
        <AutoForm onSubmit={onSubmit} schema={schema} autosave />,
      );

      expect(onSubmit).not.toBeCalled();
      wrapper.instance().getContext().onChange('a', 1);

      await new Promise(resolve => process.nextTick(resolve));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenLastCalledWith({ a: 1 });
    });
  });

  describe('when reset', () => {
    const intialModel = { a: 'foo' };
    const wrapper = mount<AutoForm>(
      <AutoForm
        onSubmit={onSubmit}
        schema={schema}
        autosave
        model={intialModel}
      />,
    );

    it('reset `model`', () => {
      wrapper.instance().reset();
      expect(wrapper.instance().getContext().model).toEqual(intialModel);
    });

    it('resets state `changedMap`', () => {
      wrapper.instance().reset();
      expect(wrapper.instance().getContext().changedMap).toEqual({});
    });

    it('resets state `changed`', () => {
      wrapper.instance().reset();
      expect(wrapper.instance().getContext().changed).toEqual(false);
    });
  });

  describe('when updated', () => {
    const wrapper = mount<AutoForm>(<AutoForm schema={schema} />);

    it('updates', () => {
      wrapper.setProps({ model: {} });
      expect(wrapper.instance().props.model).toEqual({});
    });

    it('validates', () => {
      wrapper.setProps({ model, validate: 'onChange' });
      expect(validator).toHaveBeenCalledTimes(1);
    });
  });
});
