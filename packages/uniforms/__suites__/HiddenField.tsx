import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testHiddenField(HiddenField: ComponentType<any>) {
  test('<HiddenField> - renders an input with correct id (inherited)', () => {
    renderWithZod({
      element: <HiddenField name="x" data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveAttribute('id');
  });

  test('<HiddenField> - renders an input with correct id (specified)', () => {
    renderWithZod({
      element: <HiddenField name="x" id="y" data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveAttribute('id', 'y');
  });

  test('<HiddenField> - renders an input with correct name', () => {
    renderWithZod({
      element: <HiddenField name="x" data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveAttribute('name', 'x');
  });

  test('<HiddenField> - renders an input with correct type', () => {
    renderWithZod({
      element: <HiddenField name="x" data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveAttribute('type', 'hidden');
  });

  test('<HiddenField> - renders an input with correct value (default)', () => {
    renderWithZod({
      element: <HiddenField name="x" data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveValue('');
  });

  test('<HiddenField> - renders an input with correct value (model)', () => {
    renderWithZod({
      element: <HiddenField name="x" data-testid="x" />,
      model: { x: 'y' },
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByTestId('x')).toHaveValue('y');
  });

  test('<HiddenField> - renders an input which correctly reacts on model change', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" value="y" />);
    expect(onChange).toHaveBeenLastCalledWith('x', 'y');
  });

  test('<HiddenField> - renders an input which correctly reacts on model change (empty)', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" value={undefined} />);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<HiddenField> - renders an input which correctly reacts on model change (same value)', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" value="y" />);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<HiddenField noDOM> - renders nothing', () => {
    renderWithZod({
      element: <HiddenField name="x" noDOM data-testid="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(() => screen.getByTestId('x')).toThrow();
  });

  test('<HiddenField noDOM> - renders nothing which correctly reacts on model change', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" noDOM />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" noDOM value="y" />);
    expect(onChange).toHaveBeenLastCalledWith('x', 'y');
  });

  test('<HiddenField noDOM> - renders nothing which correctly reacts on model change (empty)', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" noDOM />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" noDOM value={undefined} />);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<HiddenField noDOM> - renders nothing which correctly reacts on model change (same value)', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithZod({
      element: <HiddenField name="x" noDOM value="y" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    rerender(<HiddenField name="x" noDOM value="y" />);
    expect(onChange).not.toHaveBeenCalled();
  });
}
