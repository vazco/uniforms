import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { context } from 'uniforms';
import { TextField } from 'uniforms-bootstrap3';

import createContext from './_createContext';

const renderWithContext = (element: any, customContext: any) => {
  const Wrapper: React.ComponentType = ({ children }) => (
    <context.Provider value={customContext.context}>
      {children}
    </context.Provider>
  );
  return render(element, { wrapper: Wrapper });
};

test('<TextField> - renders an input with correct disabled state', async () => {
  renderWithContext(
    <TextField name="x" disabled />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('<TextField> - renders an input with correct readOnly state', async () => {
  renderWithContext(
    <TextField name="x" readOnly />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('readonly')).toEqual('');
});

test('<TextField> - renders an input with correct id (inherited)', async () => {
  renderWithContext(
    <TextField name="x" />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('id')).toBeTruthy();
});

test('<TextField> - renders an input with correct id (specified)', async () => {
  const id = 'y';
  renderWithContext(
    <TextField name="x" id={id} />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('id')).toBe(id);
});

test('<TextField> - renders an input with correct name', async () => {
  const name = 'x';
  renderWithContext(
    <TextField name={name} />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('name')).toBe(name);
});

test('<TextField> - renders an input with correct placeholder', async () => {
  const placeholder = 'y';
  renderWithContext(
    <TextField name="x" placeholder={placeholder} />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(
    placeholder,
  );
});

test('<TextField> - renders an input with correct type', async () => {
  renderWithContext(
    <TextField name="x" />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('type')).toBe('text');
});

test('<TextField> - renders an input with correct value (default)', () => {
  renderWithContext(
    <TextField name="x" />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('value')).toBe('');
});

test('<TextField> - renders an input with correct value (model)', () => {
  const defaultValue = 'y';
  renderWithContext(
    <TextField name="x" />,
    createContext({ x: { type: String } }, { model: { x: defaultValue } }),
  );

  expect(screen.getByRole('textbox').getAttribute('value')).toBe(defaultValue);
});

test('<TextField> - renders an input with correct value (specified)', () => {
  const defaultValue = 'y';
  renderWithContext(
    <TextField name="x" value={defaultValue} />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('value')).toBe(defaultValue);
});

test('<TextField> - renders an input which correctly reacts on change', () => {
  const onChange = jest.fn();
  const name = 'x';
  const text = 'y';
  renderWithContext(
    <TextField name={name} />,
    createContext({ [name]: { type: String } }, { onChange }),
  );

  const input = screen.getByRole('textbox');
  userEvent.type(input, text);
  expect(onChange).toHaveBeenLastCalledWith(name, text);
});

test('<TextField> - renders a label', () => {
  const label = 'y';
  renderWithContext(
    <TextField name="x" label={label} />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByLabelText(label)).toBeVisible();
});

test('<TextField> - renders a wrapper with unknown props', () => {
  const props = {
    'data-x': 'x',
    'data-y': 'y',
    'data-z': 'z',
  };

  renderWithContext(
    <TextField name="x" {...props} />,
    createContext({ x: { type: String } }),
  );

  const wrapper = screen.getByRole('textbox').closest('div');
  Object.entries(props).forEach(([key, value]) =>
    expect(wrapper?.getAttribute(key)).toBe(value),
  );
});

test('<TextField> - renders an input with autocomplete turned off', () => {
  renderWithContext(
    <TextField name="x" autoComplete="off" />,
    createContext({ x: { type: String } }),
  );

  expect(screen.getByRole('textbox').getAttribute('autocomplete')).toBe('off');
});
