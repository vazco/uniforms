import React from 'react';
import {mount} from 'enzyme';

import BaseField from 'uniforms/BaseField';
import nothing from 'uniforms/nothing';
import randomIds from 'uniforms/randomIds';
import {SimpleSchemaBridge} from 'uniforms-bridge-simple-schema';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('BaseField', () => {
  const PropsComponent = () => nothing;

  class TestField extends BaseField {
    static displayName = 'TestField';

    render() {
      return (
        <div>
          <PropsComponent {...this.getFieldProps()} />
          {this.props.children}
        </div>
      );
    }
  }

  const error1 = {details: [{name: 'a'}, {name: 'i'}]};
  const error2 = {details: [{name: 'b'}]};
  const model = {a: {b: {c: 'example'}}};
  const onChange = jest.fn();
  const randomId = randomIds();
  const state = {
    changed: false,
    changedMap: {},
    submitting: false,
    label: true,
    disabled: false,
    placeholder: true,
    showInlineError: true
  };

  const schema = new SimpleSchemaBridge({
    getDefinition(name) {
      // Simulate SimpleSchema.
      name = name.replace(/\d+/g, '$');

      return {
        a: {type: Object, label: name},
        'a.b': {type: Object, label: name},
        'a.b.c': {type: String, label: name},
        b: {type: String},
        d: {type: String, defaultValue: 'D'},
        e: {type: String, allowedValues: ['E']},
        f: {type: Number, min: 42},
        g: {type: Number, max: 42},
        h: {type: Number},
        i: {type: Date},
        j: {type: Array, minCount: 3},
        'j.$': {type: String},
        k: {type: Array},
        'k.$': {type: String},
        l: {type: String, uniforms: {label: false}},
        m: {type: String, uniforms: {placeholder: false}}
      }[name];
    },

    messageForError() {
      return 'CorrectErrorMessage';
    },

    objectKeys(name) {
      return (
        {
          a: ['b'],
          'a.b': ['c']
        }[name] || []
      );
    },

    validator() {}
  });

  const _context = context => ({context: {uniforms: {...reactContextBase, ...context}}});
  const reactContextBase = {error: error1, model, name: [], randomId, schema, state, onChange, onSubmit() {}};
  const reactContext1 = _context({});
  const reactContext2 = _context({error: error2});
  const reactContext3 = _context({error: {...error2}});
  const reactContext4 = _context({name: ['a']});
  const reactContext5 = _context({schema: Object.create(schema)});
  const reactContext6 = _context({state: {...reactContextBase.state, changedMap: {a: {}}}});
  const reactContext7 = _context({model: {a: {b: {c: 'example 2'}}}});
  const reactContext8 = _context({state: {...reactContextBase.state, disabled: true}});

  afterEach(() => {
    onChange.mockReset();
  });

  describe('child context', () => {
    const wrapper = mount(<TestField name="a" />, reactContext1);

    const context = wrapper.instance().getChildContext();

    it('exists', () => {
      expect(context).toHaveProperty('uniforms', expect.any(Object));
    });

    it('have correct `error`', () => {
      expect(context.uniforms).toHaveProperty('error', error1);
    });

    it('have correct `model`', () => {
      expect(context.uniforms).toHaveProperty('model', model);
    });

    it('have correct `name`', () => {
      expect(context.uniforms).toHaveProperty('name', expect.any(Array));
      expect(context.uniforms).toHaveProperty('name', expect.objectContaining({0: 'a'}));
    });

    it('have correct `schema`', () => {
      expect(context.uniforms).toHaveProperty('schema', schema);
    });

    it('have correct `state`', () => {
      expect(context.uniforms).toHaveProperty('state', expect.any(Object));
      expect(context.uniforms.state).toHaveProperty('label', true);
      expect(context.uniforms.state).toHaveProperty('disabled', false);
      expect(context.uniforms.state).toHaveProperty('placeholder', true);
      expect(context.uniforms.state).toHaveProperty('showInlineError', true);
    });

    it('have correct `onChange`', () => {
      expect(context.uniforms).toHaveProperty('onChange', expect.any(Function));
    });
  });

  describe('when changed', () => {
    const wrapper = mount(<TestField name="a" />, reactContext1);

    const props = wrapper
      .find(PropsComponent)
      .last()
      .props();

    it('calls `onChange` once', () => {
      props.onChange({b: 1});

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls `onChange` with correct name and value', () => {
      props.onChange({b: 1});

      expect(onChange).toHaveBeenLastCalledWith('a', {b: 1});
    });

    it('calls `onChange` with correct name and value (foreign field)', () => {
      props.onChange(1, 'a.b');

      expect(onChange).toHaveBeenLastCalledWith('a.b', 1);
    });
  });

  describe('when nested', () => {
    const wrapper = mount(
      <TestField name="a">
        <TestField name="b">
          <TestField name="c" />
        </TestField>
      </TestField>,
      reactContext1
    );

    const props = wrapper
      .find(PropsComponent)
      .last()
      .props();

    it('have correct `name`', () => {
      expect(props).toHaveProperty('name', 'a.b.c');
    });

    it('have correct `value`', () => {
      expect(props).toHaveProperty('value', 'example');
    });

    it('have unique `id`', () => {
      expect(props).toHaveProperty('id');
      expect(props.id).not.toBe(
        wrapper
          .find(TestField)
          .first()
          .props().id
      );
    });
  });

  describe('when rendered', () => {
    const wrapper = mount(<TestField name="a" />, reactContext1);

    const props = wrapper.find(PropsComponent).props();

    it('have correct `changed`', () => {
      expect(props).toHaveProperty('changed', false);
    });

    it('have correct `disabled`', () => {
      expect(props).toHaveProperty('disabled', false);
    });

    it('have correct `error`', () => {
      expect(props).toHaveProperty('error', error1.details[0]);
    });

    it('have correct `errorMessage`', () => {
      expect(props).toHaveProperty('errorMessage', 'CorrectErrorMessage');
    });

    it('have correct `field`', () => {
      expect(props).toHaveProperty('field', expect.any(Object));
      expect(props).toHaveProperty('field', schema.getField('a'));
    });

    it('have correct `findError`', () => {
      expect(props).toHaveProperty('findError', expect.any(Function));
      expect(props.findError('a')).toEqual(props.error);
    });

    it('have correct `findField`', () => {
      expect(props).toHaveProperty('findField', expect.any(Function));
      expect(props.findField('a')).toEqual(props.field);
    });

    it('have correct `findValue`', () => {
      expect(props).toHaveProperty('findValue', expect.any(Function));
      expect(props.findValue('a')).toEqual(props.value);
    });

    it('have correct `fields`', () => {
      expect(props).toHaveProperty('fields', expect.any(Array));
      expect(props).toHaveProperty('fields', schema.getSubfields('a'));
    });

    it('have correct `id`', () => {
      expect(props).toHaveProperty('id', expect.any(String));
    });

    it('have correct `label`', () => {
      expect(props).toHaveProperty('label', 'a');
    });

    it('have correct `name`', () => {
      expect(props).toHaveProperty('name', 'a');
    });

    it('have correct `onChange`', () => {
      expect(props).toHaveProperty('onChange', expect.any(Function));
    });

    it('have correct `parent`', () => {
      expect(props).toHaveProperty('parent', null);
    });

    it('have correct `placeholder`', () => {
      expect(props).toHaveProperty('placeholder', 'a');
    });

    it('have correct `showInlineError`', () => {
      expect(props).toHaveProperty('showInlineError', true);
    });

    it('have correct `value`', () => {
      expect(props).toHaveProperty('value', model.a);
    });
  });

  describe('when rendered with invalid `name`', () => {
    it('throws correct error', () => {
      const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

      expect(() => mount(<TestField name="field" />, reactContext1)).toThrow(
        Error,
        /Field not found in schema: "field"/
      );

      spy.mockRestore();
    });
  });

  describe('when rendered with `id`', () => {
    it('have correct `id`', () => {
      const wrapper = mount(<TestField name="a" id="x" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('id', 'x');
    });
  });

  describe('when rendered with `label`', () => {
    it('have correct `label` (true)', () => {
      const wrapper = mount(<TestField name="a" label />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', 'a');
    });

    it('have correct `label` (true and falsy value in schema)', () => {
      const wrapper = mount(<TestField name="l" label />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', '');
    });

    it('have correct `label` (falsy value)', () => {
      const wrapper = mount(<TestField name="a" label={false} />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', '');
    });

    it('have correct `label` (falsy value in schema)', () => {
      const wrapper = mount(<TestField name="l" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', '');
    });

    it('have correct `label` (null)', () => {
      const wrapper = mount(<TestField name="a" label={null} />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', null);
    });

    it('have correct `label` (string)', () => {
      const wrapper = mount(<TestField name="a" label="A" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('label', 'A');
    });
  });

  describe('when rendered with `placeholder`', () => {
    it('have correct `placeholder` (true)', () => {
      const wrapper = mount(<TestField name="a" placeholder />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('placeholder', 'a');
    });

    it('have correct `placeholder` (true and falsy value in schema)', () => {
      const wrapper = mount(<TestField name="m" placeholder />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('placeholder', '');
    });

    it('have correct `placeholder` (falsy value)', () => {
      const wrapper = mount(<TestField name="a" placeholder={false} />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('placeholder', '');
    });

    it('have correct `placeholder` (falsy value in schema)', () => {
      const wrapper = mount(<TestField name="m" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('placeholder', '');
    });

    it('have correct `placeholder` (string)', () => {
      const wrapper = mount(<TestField name="a" placeholder="A" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('placeholder', 'A');
    });
  });

  describe('when rendered without form', () => {
    it('should throw an error', () => {
      const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

      expect(() => mount(<TestField name="a" />)).toThrow('<TestField /> must be rendered within a form.');

      spy.mockRestore();
    });
  });

  describe('when rendered without value', () => {
    it('have correct `value` (defaultValue)', () => {
      const wrapper = mount(<TestField name="d" />, reactContext1);

      expect(wrapper.find(PropsComponent).props()).toHaveProperty('value', 'D');
    });
  });

  describe('when rerendered', () => {
    it('checks for any change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const spy = jest.spyOn(wrapper.instance(), 'render');

      wrapper.update();

      expect(spy).not.toHaveBeenCalled();

      spy.mockReset();
      spy.mockRestore();
    });

    it('have same `id`', () => {
      const wrapper = mount(<TestField name="d" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('id', expect.any(String));

      wrapper.setProps({name: 'e'});

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('id', props1.id);
    });

    it('updates on error change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('error', error1.details[0]);

      wrapper.setContext(reactContext2.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('error');
      expect(props2.error).toBeFalsy();

      wrapper.setContext(reactContext3.context);

      const props3 = wrapper.find(PropsComponent).props();
      expect(props3.error).toBeFalsy();
    });

    it('updates on error change (special)', () => {
      const wrapper = mount(<TestField name="i" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('error', error1.details[1]);

      wrapper.setContext(reactContext2.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('error');
      expect(props2.error).toBeFalsy();

      wrapper.setContext(reactContext3.context);

      const props3 = wrapper.find(PropsComponent).props();
      expect(props3.error).toBeFalsy();
    });

    it('updates on map change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('name', 'a');

      wrapper.setContext(reactContext6.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('name', 'a');
    });

    it('updates on model change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('name', 'a');

      wrapper.setContext(reactContext7.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('name', 'a');
    });

    it('updates on name change', () => {
      const wrapper = mount(<TestField name="b" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('name', 'b');

      wrapper.setContext(reactContext4.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('name', 'a.b');
    });

    it('updates on schema change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();

      wrapper.setContext(reactContext5.context);

      const props2 = wrapper.find(PropsComponent).props();

      [
        'changed',
        'changedMap',
        'disabled',
        'error',
        'errorMessage',
        'field',
        'fieldType',
        'fields',
        // 'findError', // It's a dynamic function.
        // 'findField', // It's a dynamic function.
        // 'findValue', // It's a dynamic function.
        'id',
        'label',
        'name',
        // 'onChange',  // It's a dynamic function.
        'parent',
        'placeholder',
        'required',
        'showInlineError',
        'value'
      ].forEach(prop => expect(props2).toHaveProperty(prop, props1[prop]));
    });

    it('updates on state change', () => {
      const wrapper = mount(<TestField name="a" />, reactContext1);

      const props1 = wrapper.find(PropsComponent).props();
      expect(props1).toHaveProperty('disabled', false);

      wrapper.setContext(reactContext8.context);

      const props2 = wrapper.find(PropsComponent).props();
      expect(props2).toHaveProperty('disabled', true);
    });
  });
});
