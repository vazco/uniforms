import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

const getClosestInputWithTestId = (testId: string) =>
  screen.getByTestId(testId).closest('body')?.querySelector('input');

const getDateString = (date: Date, useISOFormat: boolean) =>
  useISOFormat
    ? date.toISOString().slice(0, 16)
    : moment(date).format('YYYY-MM-DD HH:mm:ss');

export function testDateField(
  DateField: ComponentType<any>,
  {
    theme,
  }: {
    theme?: 'antd';
  } = {},
) {
  const useISOFormat = theme !== 'antd';

  test('<DateField> - renders a input with correct id (inherited)', () => {
    renderWithZod({
      element: <DateField name="x" data-testid="y" />,
      schema: z.object({ x: z.date() }),
    });
    expect(getClosestInputWithTestId('y')?.id).toBeTruthy();
  });

  test('<DateField> - renders a input with correct id (specified)', () => {
    renderWithZod({
      element: <DateField name="x" id="y" data-testid="z" />,
      schema: z.object({ x: z.date() }),
    });
    expect(getClosestInputWithTestId('z')?.id).toBe('y');
  });

  test('<DateField> - renders a input with correct name', () => {
    renderWithZod({
      element: <DateField name="x" data-testid="z" />,
      schema: z.object({ x: z.date() }),
    });
    expect(getClosestInputWithTestId('z')?.name).toBe('x');
  });

  test('<DateField> - renders an input with correct disabled state', () => {
    renderWithZod({
      element: <DateField name="x" disabled data-testid="z" />,
      schema: z.object({ x: z.date() }),
    });
    expect(getClosestInputWithTestId('z')?.disabled).toBe(true);
  });

  test('<DateField> - renders a input with correct label (specified)', () => {
    renderWithZod({
      element: <DateField name="x" label="DateFieldLabel" />,
      schema: z.object({ x: z.date() }),
    });
    expect(screen.getByText('DateFieldLabel')).toBeInTheDocument();
  });

  test('<DateField> - renders a input with correct value (default)', () => {
    renderWithZod({
      element: <DateField name="x" data-testid="z" />,
      schema: z.object({ x: z.date() }),
    });
    const input = getClosestInputWithTestId('z');
    expect(input).toBeInTheDocument();
    expect(input?.value).toBe('');
  });

  test('<DateField> - renders a input with correct value (specified)', () => {
    const now = new Date('2024-01-01 12:00:00');
    renderWithZod({
      element: <DateField name="x" data-testid="z" value={now} />,
      schema: z.object({ x: z.date() }),
    });
    const input = getClosestInputWithTestId('z');
    expect(input).toBeInTheDocument();
    expect(input!.value).toBe(getDateString(now, useISOFormat));
  });

  test('<DateField> - renders an input with correct readOnly state', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" data-testid="z" readOnly />,
      onChange,
      schema: z.object({ x: z.date() }),
    });
    const now = moment();
    const input = getClosestInputWithTestId('z');
    expect(input).toBeInTheDocument();
    await userEvent.click(input!);
    await userEvent.type(input!, `${now.format('YYYY-MM-DD HH:mm:ss')}{Enter}`);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<DateField> - renders a input with correct value (model)', () => {
    const now = new Date();
    renderWithZod({
      element: <DateField name="x" data-testid="z" />,
      schema: z.object({ x: z.date() }),
      model: { x: now },
    });
    const input = getClosestInputWithTestId('z');
    expect(input).toBeInTheDocument();
    expect(input?.value).toBe(getDateString(now, useISOFormat));
  });

  skipTestIf(theme === 'antd')(
    '<DateField> - renders a input which correctly reacts on change',
    async () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <DateField name="x" data-testid="z" />,
        onChange,
        schema: z.object({ x: z.date() }),
      });
      const input = getClosestInputWithTestId('z');
      expect(input).toBeInTheDocument();
      const now = new Date('2024-01-01 12:00:00');
      await userEvent.click(input!);
      await userEvent.type(
        input!,
        `${now.toISOString().slice(0, 16).replace('T', ' ')}{Enter}`,
      );
      expect(onChange).toHaveBeenLastCalledWith('x', now);
    },
  );

  skipTestIf(theme === 'antd')(
    '<DateField> - handles "date" type correctly (empty)',
    async () => {
      const date = '2021-01-01 11:00:00';
      const onChange = jest.fn();
      renderWithZod({
        element: <DateField name="x" type="date" data-testid="x" />,
        model: { x: new Date(date) },
        onChange,
        schema: z.object({ x: z.date() }),
      });
      const input = getClosestInputWithTestId('x');
      expect(input).toHaveValue(date.slice(0, 10));
      await userEvent.clear(input!);
      expect(onChange).toHaveBeenLastCalledWith('x', undefined);
    },
  );

  skipTestIf(theme === 'antd')(
    '<DateField> - handles "date" type correctly (fill)',
    async () => {
      const date = '2022-02-02';
      const onChange = jest.fn();
      const extraProps =
        theme === 'antd' ? { showTime: false } : { type: 'date' };
      renderWithZod({
        element: <DateField name="x" data-testid="x" {...extraProps} />,
        onChange,
        schema: z.object({ x: z.date() }),
      });
      const input = getClosestInputWithTestId('x');
      expect(input).toHaveValue('');
      await userEvent.click(input!);
      await userEvent.type(input!, `${date}{Enter}`);
      expect(onChange).toHaveBeenLastCalledWith('x', new Date(`${date}Z`));
    },
  );

  test('<DateField> - handles "date" type correctly (overflow)', async () => {
    const date = '12345-06-07';
    const onChange = jest.fn();
    renderWithZod({
      element: <DateField name="x" type="date" data-testid="x" />,
      onChange,
      schema: z.object({ x: z.date() }),
    });

    const input = getClosestInputWithTestId('x');
    expect(input).toHaveValue('');

    await userEvent.type(input!, date);
    expect(onChange).not.toHaveBeenCalled();
  });

  skipTestIf(theme === 'antd')(
    '<DateField> - handles "datetime-local" type correctly (empty)',
    async () => {
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
    },
  );

  skipTestIf(theme === 'antd')(
    '<DateField> - handles "datetime-local" type correctly (fill)',
    async () => {
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
    },
  );

  skipTestIf(theme === 'antd')(
    '<DateField> - handles "datetime-local" type correctly (overflow)',
    async () => {
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
    },
  );
}
