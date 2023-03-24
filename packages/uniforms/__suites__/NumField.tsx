import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testNumField(NumField: ComponentType<any>) {
  test('<NumField> - renders an InputNumber with correct disabled state', () => {
    renderWithZod({
      element: <NumField name="x" disabled />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });

  test('<NumField> - renders an InputNumber with correct readOnly state', () => {
    renderWithZod({
      element: <NumField name="x" readOnly />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('readonly', '');
  });

  test('<NumField> - renders an InputNumber with correct id (inherited)', () => {
    renderWithZod({
      element: <NumField name="x" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('id');
  });

  test('<NumField> - renders an InputNumber with correct id (specified)', () => {
    renderWithZod({
      element: <NumField name="x" id="y" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('id', 'y');
  });

  test('<NumField> - renders an InputNumber with correct max', () => {
    renderWithZod({
      element: <NumField name="x" max={10} />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('max', '10');
  });

  test('<NumField> - renders an InputNumber with correct min', () => {
    renderWithZod({
      element: <NumField name="x" min={10} />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('min', '10');
  });

  test('<NumField> - renders an InputNumber with correct name', () => {
    renderWithZod({
      element: <NumField name="x" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('name', 'x');
  });

  test('<NumField> - renders an InputNumber with correct placeholder', () => {
    renderWithZod({
      element: <NumField name="x" placeholder="y" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('placeholder', 'y');
  });

  test('<NumField> - renders an InputNumber with correct step (decimal)', () => {
    renderWithZod({
      element: <NumField name="x" decimal />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '0.01');
  });

  test('<NumField> - renders an InputNumber with correct step (integer)', () => {
    renderWithZod({
      element: <NumField name="x" decimal={false} />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '1');
  });

  test('<NumField> - renders an InputNumber with correct step (set)', () => {
    renderWithZod({
      element: <NumField name="x" decimal={false} step={3} />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '3');
  });

  test('<NumField> - renders an InputNumber with correct value (default)', () => {
    renderWithZod({
      element: <NumField name="x" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveValue('');
  });

  test('<NumField> - renders an InputNumber with correct value (model)', () => {
    renderWithZod({
      element: <NumField name="x" />,
      model: { x: 1 },
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveValue('1.00');
  });

  test('<NumField> - renders an InputNumber with correct value (specified)', () => {
    renderWithZod({
      element: <NumField name="x" value={2} />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByRole('spinbutton')).toHaveValue('2.00');
  });

  test('<NumField> - renders an InputNumber which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <NumField name="x" />,
      onChange,
      schema: z.object({ x: z.number() }),
    });
    await userEvent.type(screen.getByRole('spinbutton'), '1');
    expect(onChange).toHaveBeenLastCalledWith('x', 1);
  });

  test('<NumField> - renders an InputNumber which correctly reacts on change (decimal on decimal)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <NumField name="x" decimal />,
      onChange,
      schema: z.object({ x: z.number() }),
    });
    await userEvent.type(screen.getByRole('spinbutton'), '2.5');
    expect(onChange).toHaveBeenLastCalledWith('x', 2.5);
  });

  test('<NumField> - renders an InputNumber which correctly reacts on change (decimal on integer)', async () => {
    const onChange = jest.fn();

    renderWithZod({
      element: <NumField name="x" decimal={false} />,
      onChange,
      schema: z.object({ x: z.number() }),
    });
    await userEvent.type(screen.getByRole('spinbutton'), '2.5');
    expect(onChange).toHaveBeenLastCalledWith('x', 2);
  });

  test('<NumField> - renders an InputNumber which correctly reacts on change (empty)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <NumField name="x" />,
      onChange,
      model: { x: 1 },
      schema: z.object({ x: z.number() }),
    });
    await userEvent.clear(screen.getByRole('spinbutton'));
    expect(onChange).toHaveBeenLastCalledWith('x', undefined);
  });

  test('<NumField> - renders an InputNumber which correctly reacts on change (zero)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <NumField name="x" />,
      onChange,
      schema: z.object({ x: z.number() }),
    });
    await userEvent.type(screen.getByRole('spinbutton'), '0');
    expect(onChange).toHaveBeenLastCalledWith('x', 0);
  });

  test('<NumField> - renders a label', () => {
    renderWithZod({
      element: <NumField name="x" label="Y" />,
      schema: z.object({ x: z.number() }),
    });
    expect(screen.getByLabelText(/^Y/)).toBeInTheDocument();
  });
}
