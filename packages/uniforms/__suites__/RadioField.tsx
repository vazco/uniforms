import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testRadioField(RadioField: ComponentType<any>) {
  test('<RadioField> - renders a set of checkboxes', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  test('<RadioField> - renders a set of checkboxes with correct disabled state', () => {
    renderWithZod({
      element: <RadioField name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('disabled', '');
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('disabled', '');
  });

  test.skip('<RadioField> - renders a set of checkboxes with correct readOnly state', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <RadioField name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      onChange,
    });
    await userEvent.click(screen.getByLabelText('a'));
    await userEvent.click(screen.getByLabelText('b'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('<RadioField> - renders a set of checkboxes with correct id (inherited)', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute('id');
    expect(radios[1]).toHaveAttribute('id');
  });

  test('<RadioField> - renders a set of checkboxes with correct id (specified)', () => {
    renderWithZod({
      element: <RadioField name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0].getAttribute('id')).toMatchInlineSnapshot('"y-YQ"');
    expect(radios[1].getAttribute('id')).toMatchInlineSnapshot('"y-Yg"');
  });

  test('<RadioField> - renders a set of checkboxes with correct name', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('radio')[0].getAttribute('name')).toBe('x');
    expect(screen.getAllByRole('radio')[0].getAttribute('name')).toBe('x');
  });

  test('<RadioField> - renders a set of checkboxes with correct options', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getByLabelText('a')).toBeTruthy();
    expect(screen.getByLabelText('b')).toBeTruthy();
  });

  test('<RadioField> - renders a set of checkboxes with correct options (transform)', () => {
    renderWithZod({
      element: (
        <RadioField name="x" transform={(x: string) => x.toUpperCase()} />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getByLabelText('A')).toBeTruthy();
    expect(screen.getByLabelText('B')).toBeTruthy();
  });

  test('<RadioField> - renders a set of checkboxes with correct value (default)', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('checked');
    expect(screen.getAllByRole('radio')[1]).not.toHaveAttribute('checked');
  });

  test('<RadioField> - renders a set of checkboxes with correct value (model)', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });

    expect(screen.getAllByRole('radio')[0]).not.toHaveAttribute('checked');
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('checked');
  });

  test('<RadioField> - renders a set of checkboxes with correct value (specified)', () => {
    renderWithZod({
      element: <RadioField name="x" value="b" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('radio')[0]).not.toHaveAttribute('checked');
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('checked');
  });

  test.skip('<RadioField> - renders a set of checkboxes which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <RadioField name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      onChange,
    });
    await userEvent.click(screen.getByLabelText('b'));

    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
  });

  test.skip('<RadioField> - renders a set of checkboxes which correctly reacts on change (same value)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <RadioField name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      onChange,
    });
    await userEvent.click(screen.getByLabelText('a'));

    expect(onChange).toHaveBeenLastCalledWith('x', 'a');
  });

  test('<RadioField> - renders a label', () => {
    renderWithZod({
      element: <RadioField name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getByText('y')).toBeTruthy();
  });

  test('<RadioField> - renders a wrapper with unknown props', () => {
    renderWithZod({
      element: (
        <RadioField name="x" data-x="x" data-y="y" data-z="z" data-testid="x" />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getByTestId('x')).toHaveAttribute('data-x', 'x');
    expect(screen.getByTestId('x')).toHaveAttribute('data-z', 'z');
    expect(screen.getByTestId('x')).toHaveAttribute('data-y', 'y');
  });

  test('<RadioField> - works with special characters', () => {
    renderWithZod({
      element: <RadioField name="x" />,
      schema: z.object({ x: z.enum(['ă', 'ș']) }),
    });

    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByLabelText('ă')).toBeTruthy();
    expect(screen.getByLabelText('ș')).toBeTruthy();
  });
}
