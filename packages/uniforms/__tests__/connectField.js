import React from 'react';
import {mount} from 'enzyme';

import connectField from 'uniforms/connectField';
import nothing from 'uniforms/nothing';
import randomIds from 'uniforms/randomIds';
import {SimpleSchemaBridge} from 'uniforms-bridge-simple-schema';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('connectField', () => {
  const error = new Error();
  const onChange = jest.fn();
  const randomId = randomIds();
  const state = {
    changed: false,
    changedMap: {},
    submitting: false,
    label: true,
    disabled: false,
    placeholder: false,
    showInlineError: true
  };

  const schema = new SimpleSchemaBridge({
    getDefinition(name) {
      return {
        field: {type: Object, label: 'Field'},
        'field.subfield': {type: Number, label: 'Subfield'},
        another: {type: String, optional: true}
      }[name];
    },

    messageForError() {},

    objectKeys(name) {
      return {
        field: ['subfield'],
        'field.subfield': []
      }[name];
    },

    validator() {}
  });

  const reactContext = {
    context: {uniforms: {error, model: {}, name: [], randomId, schema, state, onChange, onSubmit() {}}}
  };

  const Test = jest.fn(() => nothing);

  beforeEach(() => {
    Test.mockClear();
    onChange.mockReset();
  });

  describe('when called', () => {
    it('creates component', () => {
      const Field = connectField(Test);

      expect(Field).toBeInstanceOf(Function);
    });
  });

  describe('when called with `baseField`', () => {
    it('inherits from `baseField`', () => {
      /* istanbul ignore next */
      class Class {}

      Class.property1 = 1;
      Class.property2 = 2;

      const Field = connectField(Test, {baseField: Class});

      expect(Field.property1).toBe(1);
      expect(Field.property2).toBe(2);
    });
  });

  describe('when called with `includeParent`', () => {
    it('provides parent field (true)', () => {
      const Field = connectField(Test, {includeParent: true});

      mount(<Field name="field.subfield" />, reactContext);

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            parent: expect.objectContaining({label: 'Field', field: expect.objectContaining({type: Object})})
          })
        ])
      );
    });

    it('rerenders on parent change (true)', () => {
      const Field = connectField(Test, {includeParent: true});

      const wrapper = mount(<Field name="field.subfield" />, reactContext);

      wrapper.update();

      expect(Test).toHaveBeenCalledTimes(1);
    });

    it('rerenders on parent change (if any) (true)', () => {
      const Field = connectField(Test, {includeParent: true});

      const wrapper = mount(<Field name="field.subfield" />, reactContext);

      wrapper.setContext({uniforms: {...reactContext.context.uniforms, model: {field: {field: 1}}}});

      expect(Test).toHaveBeenCalledTimes(2);
    });

    it('hides parent field (false)', () => {
      const Field = connectField(Test, {includeParent: false});

      mount(<Field name="field.subfield" />, reactContext);

      expect(Test.mock.calls[0]).not.toEqual(
        expect.arrayContaining([expect.objectContaining({parent: {label: 'Field', field: {type: Object}}})])
      );
    });
  });

  describe('when called with `includeInChain`', () => {
    it('is in chain (true)', () => {
      const Field1 = connectField(props => props.children, {includeInChain: true});
      const Field2 = connectField(Test);

      mount(
        <Field1 name="field">
          <Field2 name="subfield" />
        </Field1>,
        reactContext
      );

      expect(Test.mock.calls[0]).toEqual(expect.arrayContaining([expect.objectContaining({name: 'field.subfield'})]));
    });

    it('is not in chain (false)', () => {
      const Field1 = connectField(props => props.children, {includeInChain: false});
      const Field2 = connectField(Test);

      mount(
        <Field1 name="field">
          <Field2 name="field.subfield" />
        </Field1>,
        reactContext
      );

      expect(Test.mock.calls[0]).toEqual(expect.arrayContaining([expect.objectContaining({name: 'field.subfield'})]));
    });
  });

  describe('when called with `initialValue`', () => {
    it('includes default value (true)', () => {
      const Field = connectField(Test, {initialValue: true, ensureValue: false});

      mount(<Field name="field" />, reactContext);

      expect(onChange).toBeCalledWith('field', {});
    });

    it('does nothing (false)', () => {
      const Field = connectField(Test, {initialValue: false});

      mount(<Field name="field" />, reactContext);

      expect(onChange).not.toBeCalled();
    });

    it('respects `required`', () => {
      const Field = connectField(Test, {initialValue: true});

      mount(<Field name="another" />, reactContext);

      expect(onChange).not.toBeCalled();
    });
  });

  describe('when called with `mapProps`', () => {
    it('provides mapped props', () => {
      const Field = connectField(Test, {mapProps: () => ({a: 1})});

      mount(<Field name="field" />, reactContext);

      expect(Test.mock.calls[0]).toEqual(expect.arrayContaining([{}]));
    });
  });

  describe('when rendered with value', () => {
    it('treats value as initial value', () => {
      const Field = connectField(Test);

      mount(<Field name="field" value="initialValueExample" />, reactContext);

      expect(onChange).toBeCalledWith('field', 'initialValueExample');
    });
  });
});
