import TextFieldMaterial from '@mui/material/TextField';
import React from 'react';
import { TextField } from 'uniforms-mui';
import { testTextField } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - TextField tests', () => {
  testTextField(TextField);
});

it('<TextField> - renders an TextField', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
});

it('<TextField> - renders a TextField with correct disabled state', () => {
  const element = <TextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('disabled')).toBe(true);
});

it('<TextField> - renders a TextField with correct readOnly state', () => {
  const element = <TextField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('inputProps')!.readOnly).toBe(
    true,
  );
});

it('<TextField> - renders a TextField with correct id (inherited)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('id')).toBeTruthy();
});

it('<TextField> - renders a TextField with correct id (specified)', () => {
  const element = <TextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('id')).toBe('y');
});

it('<TextField> - renders a TextField with correct name', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('name')).toBe('x');
});

it('<TextField> - renders a TextField with correct placeholder', () => {
  const element = <TextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('placeholder')).toBe('y');
});

it('<TextField> - renders a TextField with correct value (default)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('');
});

it('<TextField> - renders a TextField with correct value (model)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('y');
});

it('<TextField> - renders a TextField with correct value (specified)', () => {
  const element = <TextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('y');
});

it('<TextField> - renders a TextField which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

it('<TextField> - renders a TextField which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: '' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

it('<TextField> - renders a TextField which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

it('<TextField> - renders a label', () => {
  const element = <TextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('label')).toBe('y');
});

it('<TextField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <TextField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial).prop('helperText')).toBe('Error');
});

it('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <TextField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial).prop('helperText')).toBeUndefined();
});

it('<TextField> - renders a input with autocomplete off', () => {
  const element = <TextField name="x" autoComplete="off" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('autoComplete')).toBe('off');
});
