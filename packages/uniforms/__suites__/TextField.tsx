import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';

import { render } from './render';

export function testTextField(TextField: ComponentType<any>) {
  it('<TextField> - renders an input with correct disabled state', () => {
    render(<TextField name="x" disabled />, { x: String });

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('<TextField> - renders an input with correct readOnly state', () => {
    render(<TextField name="x" readOnly />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  it('<TextField> - renders an input with autocomplete turned off', () => {
    render(<TextField name="x" autoComplete="off" />, {
      x: String,
    });

    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  it('<TextField> - renders an input with correct id (inherited)', () => {
    render(<TextField name="x" />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('id');
  });

  it('<TextField> - renders an input with correct id (specified)', () => {
    const id = 'y';
    render(<TextField name="x" id={id} />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('id', id);
  });

  it('<TextField> - renders an input with correct name', () => {
    const name = 'x';
    render(<TextField name={name} />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('name', name);
  });

  it('<TextField> - renders an input with correct placeholder', () => {
    const placeholder = 'y';
    render(<TextField name="x" placeholder={placeholder} />, {
      x: String,
    });

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      placeholder,
    );
  });

  it('<TextField> - renders an input with correct type', () => {
    render(<TextField name="x" />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('<TextField> - renders an input with correct type (url)', () => {
    render(<TextField name="x" type="url" />, { x: String });

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('<TextField> - renders an input with correct value (default)', () => {
    render(<TextField name="x" />, { x: String });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('<TextField> - renders an input with correct value (model)', () => {
    const defaultValue = 'y';
    render(
      <TextField name="x" />,
      { x: String },
      { model: { x: defaultValue } },
    );

    expect(screen.getByRole('textbox')).toHaveValue(defaultValue);
  });

  it('<TextField> - renders an input with correct value (specified)', () => {
    const defaultValue = 'y';
    render(<TextField name="x" value={defaultValue} />, {
      x: String,
    });

    expect(screen.getByRole('textbox')).toHaveValue(defaultValue);
  });

  it('<TextField> - renders an input which correctly reacts on change', () => {
    const onChange = jest.fn();
    const name = 'x';
    const text = 'y';
    render(<TextField name={name} />, { [name]: String }, { onChange });

    const input = screen.getByRole('textbox');
    userEvent.type(input, text);
    expect(onChange).toHaveBeenLastCalledWith(name, text);
  });

  it('<TextField> - renders an input which correctly reacts on change (empty value)', () => {
    const onChange = jest.fn();
    const name = 'x';
    render(
      <TextField name={name} />,
      { [name]: String },
      { model: { [name]: 'y' }, onChange },
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, '{backspace}');
    expect(onChange).toHaveBeenLastCalledWith(name, '');
  });

  it('<TextField> - renders a label', () => {
    render(<TextField name="x" label="y" />, { x: String });

    expect(screen.getByLabelText(/y.*/)).toBeInTheDocument();
  });
}
