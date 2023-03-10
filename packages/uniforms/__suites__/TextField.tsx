import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testTextField(TextField: ComponentType<any>) {
  test('<TextField> - renders an input with correct disabled state', () => {
    renderWithZod({
      element: <TextField name="x" disabled />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('<TextField> - renders an input with correct readOnly state', () => {
    renderWithZod({
      element: <TextField name="x" readOnly />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  test('<TextField> - renders an input with autocomplete turned off', () => {
    renderWithZod({
      element: <TextField name="x" autoComplete="off" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  test('<TextField> - renders an input with correct id (inherited)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id');
  });

  test('<TextField> - renders an input with correct id (specified)', () => {
    renderWithZod({
      element: <TextField name="x" id="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'y');
  });

  test('<TextField> - renders an input with correct name', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'x');
  });

  test('<TextField> - renders an input with correct placeholder', () => {
    renderWithZod({
      element: <TextField name="x" placeholder="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'y');
  });

  test('<TextField> - renders an input with correct type', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  test('<TextField> - renders an input with correct type (url)', () => {
    renderWithZod({
      element: <TextField name="x" type="url" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  test('<TextField> - renders an input with correct value (default)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('<TextField> - renders an input with correct value (model)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      model: { x: 'y' },
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<TextField> - renders an input with correct value (specified)', () => {
    renderWithZod({
      element: <TextField name="x" value="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<TextField> - renders an input which correctly reacts on change', async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <TextField name="x" />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), 'y');
    expect(onChange).toHaveBeenLastCalledWith('x', 'y');
  });

  test('<TextField> - renders an input which correctly reacts on change (empty value)', async () => {
    const onChange = vi.fn();
    renderWithZod({
      element: <TextField name="x" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), '{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith('x', '');
  });

  test('<TextField> - renders a label', () => {
    renderWithZod({
      element: <TextField name="x" label="Y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByLabelText(/^Y/)).toBeInTheDocument();
  });
}
