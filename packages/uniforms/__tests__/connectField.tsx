import React, { ReactNode } from 'react';
import SimpleSchema from 'simpl-schema';
import {
  BaseForm,
  Context,
  UnknownObject,
  connectField,
  randomIds,
} from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

import mount from './_mount';

describe('connectField', () => {
  const onChange = jest.fn();
  const schema = new SimpleSchema2Bridge({
    schema: new SimpleSchema({
      another: { type: String, optional: true },
      field: { type: Object, label: 'Field' },
      'field.subfield': { type: Number, label: 'Subfield' },
    }),
  });

  const reactContext = {
    context: {
      changed: false,
      changedMap: {},
      error: undefined,
      model: {},
      name: [],
      onChange,
      onSubmit() {},
      randomId: randomIds(),
      schema,
      state: {
        disabled: false,
        placeholder: false,
        readOnly: false,
        showInlineError: true,
      },
      submitted: false,
      submitting: false,
      validating: false,
      formRef: {} as BaseForm<UnknownObject>,
    } as Context<any>,
  };

  const Test = jest.fn(props => props.children || null);

  beforeEach(() => {
    Test.mockClear();
    onChange.mockClear();
  });

  describe('when called', () => {
    it('creates component', () => {
      const Field = connectField(Test);

      expect(Field).toBeInstanceOf(Function);
      expect(Field.Component).toEqual(Test);
    });
  });

  describe('when called with `kind`', () => {
    it('does not set default value', () => {
      const Field = connectField(Test);

      expect(Field.options).toEqual(undefined);
    });

    it('includes options object with `kind` value (leaf)', () => {
      const Field = connectField(Test, { kind: 'leaf' });

      expect(Field.options).toEqual({ kind: 'leaf' });
    });

    it('includes options object with `kind` value (node)', () => {
      const Field = connectField(Test, { kind: 'node' });

      expect(Field.options).toEqual({ kind: 'node' });
    });
  });

  describe('when called with `initialValue`', () => {
    it('includes default value (true)', () => {
      const Field = connectField(Test, { initialValue: true });

      mount(<Field name="field" />, reactContext);

      expect(onChange).toBeCalledWith('field', {});
    });

    it('does nothing (false)', () => {
      const Field = connectField(Test, { initialValue: false });

      mount(<Field name="field" />, reactContext);

      expect(onChange).not.toBeCalled();
    });

    it('respects `required` (props)', () => {
      const Field = connectField(Test, { initialValue: true });

      mount(<Field name="another" required />, reactContext);

      expect(onChange).not.toBeCalled();
    });

    it('respects `required` (schema)', () => {
      const Field = connectField(Test, { initialValue: true });

      mount(<Field name="another" />, reactContext);

      expect(onChange).not.toBeCalled();
    });
  });

  describe('when rendered with value', () => {
    it('treats value as initial value', async () => {
      const Field = connectField(Test);

      mount(<Field name="field" value="initialValueExample" />, reactContext);
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(onChange).toBeCalledWith('field', 'initialValueExample');
    });
  });

  describe('when rendered with label', () => {
    const labelA = <span style={{ color: 'red' }}>Error</span>;
    const labelB = <span style={{ color: 'green' }}>OK</span>;

    it.each([
      ['Props', '', 'Props'],
      ['Props', 'Schema', 'Props'],
      ['Props', labelB, 'Props'],
      ['Props', undefined, 'Props'],
      ['', undefined, ''],
      ['', 'Schema', ''],
      ['', labelB, ''],
      ['', undefined, ''],
      [labelA, '', labelA],
      [labelA, 'Schema', labelA],
      [labelA, labelB, labelA],
      [labelA, undefined, labelA],
      [undefined, '', ''],
      [undefined, 'Schema', 'Schema'],
      [undefined, labelB, labelB],
      [undefined, undefined, ''],
    ] as [ReactNode, ReactNode, ReactNode][])(
      'resolves it correctly (%#)',
      (prop, schema, result) => {
        const context: typeof reactContext = {
          context: {
            ...reactContext.context,
            state: { ...reactContext.context.state },
          },
        };

        jest
          .spyOn(context.context.schema, 'getProps')
          .mockReturnValueOnce({ label: schema });

        const Field = connectField(Test);
        const wrapper = mount(<Field name="field" label={prop} />, context);
        expect(wrapper.find(Test).prop('label')).toBe(result);
      },
    );
  });

  describe('when rendered provides correct onChange', () => {
    it('is defaults to field name', () => {
      const Field = connectField(Test);
      const value = 'some value';
      const wrapper = mount(<Field name="another" />, reactContext);
      wrapper.find(Test).prop('onChange')(value);
      expect(onChange).toBeCalledWith('another', value);
    });

    it('is able to set another field value', () => {
      const Field = connectField(Test);
      const value = { subfield: 123 };
      const wrapper = mount(<Field name="another" />, reactContext);
      wrapper.find(Test).prop('onChange')(value, 'field');
      expect(onChange).toBeCalledWith('field', value);
    });
  });

  it('works with nested labels', () => {
    const Field = connectField(Test);
    const wrapper = mount(
      <Field name="field" label="">
        <Field name="" label="" />
        <Field name="subfield" label="Other">
          <Field name="" label="" />
        </Field>
        <Field name="subfield" label="">
          <Field name="" label="">
            <Field name="" label="" />
          </Field>
        </Field>
      </Field>,
      reactContext,
    );

    expect(wrapper.find(Test).at(0).prop('label')).toBe('');
    expect(wrapper.find(Test).at(1).prop('label')).toBe('');
    expect(wrapper.find(Test).at(2).prop('label')).toBe('Other');
    expect(wrapper.find(Test).at(3).prop('label')).toBe('');
    expect(wrapper.find(Test).at(4).prop('label')).toBe('');
    expect(wrapper.find(Test).at(5).prop('label')).toBe('');
    expect(wrapper.find(Test).at(6).prop('label')).toBe('');
  });
});
