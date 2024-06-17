import { screen } from '@testing-library/react';
import userEvent, {
  PointerEventsCheckLevel,
} from '@testing-library/user-event';
import moment from 'moment';
import React from 'react';
import { DateField } from 'uniforms-antd';
import { renderWithZod } from 'uniforms/__suites__';
import { z } from 'zod';

const getClosestInput = (text: string) =>
  screen.getByText(text).closest('.ant-row')?.querySelector('input');

test('<DateField> - default props override', async () => {
  const pickerProps = { showTime: false, style: { background: 'red' } };
  renderWithZod({
    element: <DateField name="x" {...pickerProps} />,
    schema: z.object({ x: z.date() }),
  });
  const body = screen.getByText('X').closest('body');
  const input = body?.querySelector('.ant-picker');
  expect(input).toBeInTheDocument();
  expect(input).toHaveStyle('background: red');

  await userEvent.click(input!);
  expect(body?.querySelector('.ant-picker-time-panel')).not.toBeInTheDocument();
});

test('<DateField> - renders a input which correctly reacts on change (empty)', async () => {
  const onChange = jest.fn();
  renderWithZod({
    element: <DateField name="x" value={new Date()} />,
    onChange,
    schema: z.object({ x: z.date() }),
  });

  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  await userEvent.click(input!);
  const clear = input?.parentElement?.querySelector('.ant-picker-clear');
  await userEvent.click(clear!);
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<DateField> - renders a input which correctly reacts on change', async () => {
  const onChange = jest.fn();
  const now = moment('2024-01-01 12:00:00');
  renderWithZod({
    element: <DateField name="x" />,
    onChange,
    schema: z.object({ x: z.date() }),
  });

  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  await userEvent.click(input!);
  await userEvent.type(input!, now.format('YYYY-MM-DD HH:mm:ss'));
  const ok = screen.getByText('Ok');
  await userEvent.click(ok, {
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  });
  expect(onChange).toHaveBeenLastCalledWith('x', now.toDate());
});

test('<DateField> - renders a wrapper with unknown props', () => {
  renderWithZod({
    element: <DateField name="x" data-x="x" data-y="y" data-z="z" />,
    schema: z.object({ x: z.date() }),
  });
  const input = getClosestInput('X');
  expect(input?.getAttribute('data-x')).toBe('x');
  expect(input?.getAttribute('data-y')).toBe('y');
  expect(input?.getAttribute('data-z')).toBe('z');
});
