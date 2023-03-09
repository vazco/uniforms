import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testDateField(DateField: ComponentType<any>) {
  test('<DateField> - handles "date" type correctly (empty)', async () => {
    const date = '2021-01-01';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" type="date" />,
      model: { x: new Date(`${date}Z`) },
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue(date);

    await userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith('x', undefined);
  });

  test('<DateField> - handles "date" type correctly (fill)', async () => {
    const date = '2022-02-02';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" type="date" />,
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue('');

    await userEvent.type(input, date);
    expect(onChange).toHaveBeenLastCalledWith('x', new Date(`${date}Z`));
  });

  test('<DateField> - handles "date" type correctly (overflow)', async () => {
    const date = '12345-06-07';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" type="date" />,
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue('');

    await userEvent.type(input, date);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<DateField> - handles "datetime-local" type correctly (empty)', async () => {
    const date = '2021-01-01T11:11';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" />,
      model: { x: new Date(`${date}Z`) },
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue(date);

    await userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith('x', undefined);
  });

  test('<DateField> - handles "datetime-local" type correctly (fill)', async () => {
    const date = '2022-02-02T22:22';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" />,
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue('');

    await userEvent.type(input, date);
    expect(onChange).toHaveBeenLastCalledWith('x', new Date(`${date}Z`));
  });

  test('<DateField> - handles "datetime-local" type correctly (overflow)', async () => {
    const date = '12345-06-07T08:09';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" type="date" />,
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = screen.getByLabelText(/^X/);
    expect(input).toHaveValue('');

    await userEvent.type(input, date);
    expect(onChange).not.toHaveBeenCalled();
  });
}
