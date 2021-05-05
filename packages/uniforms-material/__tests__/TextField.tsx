import TextFieldMaterial from '@material-ui/core/TextField';
import { screen } from '@testing-library/react';
import React from 'react';
import { TextField } from 'uniforms-material';
import { render, TextFieldTests } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - TextField tests', () => {
  TextFieldTests(TextField);

  test('<TextField> - renders a TextField with correct error text (specified)', () => {
    const errorMessage = 'Error';
    render(
      <TextField
        error={new Error()}
        name="x"
        showInlineError
        errorMessage={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
    const errorMessage = 'Error';
    render(
      <TextField
        name="x"
        error={new Error()}
        showInlineError={false}
        errorMessage={errorMessage}
      />,
    );

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});

test('<TextField> - renders an TextField', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
});

test('<TextField> - renders a TextField with correct disabled state', () => {
  const element = <TextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('disabled')).toBe(true);
});

test('<TextField> - renders a TextField with correct readOnly state', () => {
  const element = <TextField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('inputProps')!.readOnly).toBe(
    true,
  );
});

test('<TextField> - renders a TextField with correct id (inherited)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('id')).toBeTruthy();
});

test('<TextField> - renders a TextField with correct id (specified)', () => {
  const element = <TextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('id')).toBe('y');
});

test('<TextField> - renders a TextField with correct name', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('name')).toBe('x');
});

test('<TextField> - renders a TextField with correct placeholder', () => {
  const element = <TextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('placeholder')).toBe('y');
});

test('<TextField> - renders a TextField with correct value (default)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('');
});

test('<TextField> - renders a TextField with correct value (model)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('y');
});

test('<TextField> - renders a TextField with correct value (specified)', () => {
  const element = <TextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('value')).toBe('y');
});

test('<TextField> - renders a TextField which correctly reacts on change', () => {
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

test('<TextField> - renders a TextField which correctly reacts on change (empty)', () => {
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

test('<TextField> - renders a TextField which correctly reacts on change (same value)', () => {
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

test('<TextField> - renders a label', () => {
  const element = <TextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('label')).toBe('y');
});

test('<TextField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <TextField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial).prop('helperText')).toBe('Error');
});

test('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
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

test('<TextField> - renders a input with autocomplete off', () => {
  const element = <TextField name="x" autoComplete="off" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextFieldMaterial)).toHaveLength(1);
  expect(wrapper.find(TextFieldMaterial).prop('autoComplete')).toBe('off');
});
