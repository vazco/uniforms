import React from 'react';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';
import { Context, connectField, randomIds } from 'uniforms';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('connectField', () => {
  const onChange = jest.fn();
  const schema = new SimpleSchemaBridge({
    getDefinition(name) {
      return {
        field: { type: Object, label: 'Field' },
        'field.subfield': { type: Number, label: 'Subfield' },
        another: { type: String, optional: true },
      }[name];
    },

    messageForError() {},

    objectKeys(name) {
      return {
        field: ['subfield'],
        'field.subfield': [],
      }[name];
    },

    validator() {},
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
        label: true,
        placeholder: false,
        showInlineError: true,
      },
      submitting: false,
      validating: false,
    } as Context<any>,
  };

  const Test = jest.fn(() => null);

  beforeEach(() => {
    Test.mockClear();
    onChange.mockClear();
  });

  describe('when called', () => {
    it('creates component', () => {
      const Field = connectField(Test);

      expect(Field).toBeInstanceOf(Function);
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

    it('respects `required`', () => {
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
});
