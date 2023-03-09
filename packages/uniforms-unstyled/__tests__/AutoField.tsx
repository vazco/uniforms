import React from 'react';
import {
  AutoField,
  BoolField,
  DateField,
  ListField,
  NestField,
  NumField,
  RadioField,
  SelectField,
  TextField,
} from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<AutoField> - works', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(AutoField)).toHaveLength(1);
});

test('<AutoField> - detects RadioField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: {
        type: String,
        allowedValues: ['x', 'y'],
        uniforms: { checkboxes: true },
      },
    }),
  );

  expect(wrapper.find(RadioField.Component)).toHaveLength(1);
});

test('<AutoField> - detects SelectField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array, allowedValues: ['x', 'y'] },
      'x.$': { type: String },
    }),
  );

  expect(wrapper.find(SelectField.Component)).toHaveLength(1);
});

test('<AutoField> - detects DateField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DateField.Component)).toHaveLength(1);
});

test('<AutoField> - detects ListField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListField)).toHaveLength(1);
});

test('<AutoField> - detects NumField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Number } }));

  expect(wrapper.find(NumField.Component)).toHaveLength(1);
});

test('<AutoField> - detects NestField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Object } }));

  expect(wrapper.find(NestField)).toHaveLength(1);
});

test('<AutoField> - detects TextField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField.Component)).toHaveLength(1);
});

test('<AutoField> - detects BoolField', () => {
  const element = <AutoField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(BoolField.Component)).toHaveLength(1);
});

test('<AutoField> - uses Component (schema)', () => {
  const Component = jest.fn(() => null);

  const element = <AutoField name="x" />;
  mount(
    element,
    createContext({ x: { type: String, uniforms: { component: Component } } }),
  );

  expect(Component).toHaveBeenCalledTimes(1);
});

test('<AutoField> - uses Component (props)', () => {
  const Component = jest.fn(() => null);

  const element = <AutoField name="x" component={Component} />;
  mount(element, createContext({ x: { type: String } }));

  expect(Component).toHaveBeenCalledTimes(1);
});

test('<AutoField> - uses Component (context)', () => {
  const FieldA = jest.fn(() => null);
  const FieldB = jest.fn(() => null);

  const element = (
    <AutoField.componentDetectorContext.Provider
      value={props => (props['data-component'] === 'A' ? FieldA : FieldB)}
    >
      <>
        <AutoField name="x" data-component="A" />
        <AutoField name="x" data-component="B" />
      </>
    </AutoField.componentDetectorContext.Provider>
  );
  mount(element, createContext({ x: { type: String } }));

  expect(FieldA).toHaveBeenCalledTimes(1);
  expect(FieldB).toHaveBeenCalledTimes(1);
});

test('<AutoField> - uses Component (invalid)', () => {
  const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
  expect(() => {
    const element = <AutoField name="x" />;
    mount(element, createContext({ x: { type: Symbol } }));
  }).toThrow(/Unsupported field type:/);
  spy.mockRestore();
});
