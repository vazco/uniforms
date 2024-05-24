import { fireEvent, screen } from '@testing-library/react';
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

test('<DateField> - renders an input', () => {
  renderWithZod({
    element: <DateField name="x" />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')).toBeInTheDocument();
});

test('<DateField> - default props override', () => {
  const pickerProps = { name: 'y' };
  renderWithZod({
    // @ts-ignore -- passing the same prop for testing purposes
    element: <DateField name="x" {...pickerProps} />,
    schema: z.object({ y: z.date() }),
  });
  expect(screen.getByText('Y')).toBeInTheDocument();
});

test('<DateField> - renders a input with correct id (inherited)', () => {
  renderWithZod({
    element: <DateField name="x" />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')?.id).toBeTruthy();
});

test('<DateField> - renders a input with correct id (specified)', () => {
  renderWithZod({
    element: <DateField name="x" id="y" />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')?.id).toBe('y');
});

test('<DateField> - renders a input with correct name', () => {
  renderWithZod({
    element: <DateField name="x" />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')?.name).toBe('x');
});

test('<DateField> - renders an input with correct disabled state', () => {
  renderWithZod({
    element: <DateField name="x" disabled />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')?.disabled).toBe(true);
});

test('<DateField> - renders an input with correct readOnly state', async () => {
  const onChange = jest.fn();
  const now = moment();
  renderWithZod({
    element: <DateField name="x" readOnly />,
    onChange,
    schema: z.object({ x: z.date() }),
  });

  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  fireEvent.mouseDown(input!);
  fireEvent.change(input!, { target: { value: now } });
  expect(onChange).not.toHaveBeenCalled();
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
    element: <DateField name="x" />,
    schema: z.object({ x: z.date() }),
  });
  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  expect(input?.value).toBe('');
});

test('<DateField> - renders a input with correct value (model)', () => {
  const now = moment('2024-01-01 12:00:00');
  renderWithZod({
    element: <DateField name="x" />,
    schema: z.object({ x: z.date() }),
    model: { x: now.toDate() },
  });
  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  expect(input?.value).toBe(moment(now).format('YYYY-MM-DD HH:mm:ss'));
});

test('<DateField> - renders a input with correct value (specified)', () => {
  const now = moment('2024-01-01 12:00:00');
  renderWithZod({
    element: <DateField name="x" value={now} />,
    schema: z.object({ x: z.date() }),
  });
  const input = getClosestInput('X');
  expect(input).toBeInTheDocument();
  expect(input?.value).toBe(moment(now).format('YYYY-MM-DD HH:mm:ss'));
});

// FIXME: This test is broken.
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

test('<DateField> - renders a wrapper with unknown props', () => {
  renderWithZod({
    element: <DateField name="x" data-x="x" data-y="y" data-z="z" />,
    schema: z.object({ x: z.date() }),
  });
  expect(getClosestInput('X')?.getAttribute('data-x')).toBe('x');
  expect(getClosestInput('X')?.getAttribute('data-y')).toBe('y');
  expect(getClosestInput('X')?.getAttribute('data-z')).toBe('z');
});
