import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import createContext, { render } from './renderWithContext';

export function TextFieldTests(TextField: React.FC<any>) {
  test('<TextField> - renders an input with correct disabled state', async () => {
    render(<TextField name="x" disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('<TextField> - renders an input with correct readOnly state', async () => {
    render(<TextField name="x" readOnly />);

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  test('<TextField> - renders an input with autocomplete turned off', () => {
    render(<TextField name="x" autoComplete="off" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  test('<TextField> - renders an input with correct id (inherited)', async () => {
    render(<TextField name="x" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('id');
  });

  test('<TextField> - renders an input with correct id (specified)', async () => {
    const id = 'y';
    render(<TextField name="x" id={id} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('id', id);
  });

  test('<TextField> - renders an input with correct name', async () => {
    const name = 'x';
    render(<TextField name={name} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('name', name);
  });

  test('<TextField> - renders an input with correct placeholder', async () => {
    const placeholder = 'y';
    render(<TextField name="x" placeholder={placeholder} />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      placeholder,
    );
  });

  test('<TextField> - renders an input with correct type', async () => {
    render(<TextField name="x" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  test('<TextField> - renders an input with correct type (password)', async () => {
    render(<TextField name="x" type="url" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  test('<TextField> - renders an input with correct value (default)', () => {
    render(<TextField name="x" />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('<TextField> - renders an input with correct value (model)', () => {
    const defaultValue = 'y';
    render(
      <TextField name="x" />,
      createContext({ x: { type: String } }, { model: { x: defaultValue } }),
    );

    expect(screen.getByRole('textbox')).toHaveValue(defaultValue);
  });

  test('<TextField> - renders an input with correct value (specified)', () => {
    const defaultValue = 'y';
    render(<TextField name="x" value={defaultValue} />);

    expect(screen.getByRole('textbox')).toHaveValue(defaultValue);
  });

  test('<TextField> - renders an input which correctly reacts on change', () => {
    const onChange = jest.fn();
    const name = 'x';
    const text = 'y';
    render(
      <TextField name={name} />,
      createContext({ [name]: { type: String } }, { onChange }),
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, text);
    expect(onChange).toHaveBeenLastCalledWith(name, text);
  });

  test('<TextField> - renders a label', () => {
    const label = 'y';
    render(<TextField name="x" label={label} />);

    expect(screen.getByLabelText(/y.*/)).toBeInTheDocument();
  });
}