import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithZod } from 'uniforms/__suites__';
import { DateField } from 'uniforms-mui';
import { z } from 'zod';

describe('@RTL - DateField tests', () => {
  test('<DateField> - renders a Input with correct error text (specified)', () => {
    const error = new Error();
    renderWithZod({
      element: (
        <DateField
          name="x"
          error={error}
          errorMessage="Error"
          showInlineError
        />
      ),
      schema: z.object({ x: z.date() }),
    });
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('<DateField> - renders a Input with correct error text (showInlineError=false)', () => {
    const error = new Error();
    renderWithZod({
      element: (
        <DateField
          name="x"
          error={error}
          errorMessage="Error"
          showInlineError={false}
        />
      ),
      schema: z.object({ x: z.date() }),
    });
    expect(
      screen.getByText('X').nextElementSibling?.classList.contains('Mui-error'),
    ).toBe(true);
  });
});

describe('@RTL - DateField slotProps', () => {
  test('<DateField> - merges `slotProps.htmlInput` with defaults (object)', () => {
    const min = new Date('2020-01-01T00:00:00.000Z');
    renderWithZod({
      element: (
        <DateField
          name="x"
          min={min}
          readOnly
          slotProps={{ htmlInput: { 'data-testid': 'input' } }}
        />
      ),
      schema: z.object({ x: z.date() }),
    });
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('min', '2020-01-01T00:00');
    expect(input).toHaveAttribute('readonly');
  });

  test('<DateField> - merges `slotProps.htmlInput` with defaults (function)', () => {
    const min = new Date('2020-01-01T00:00:00.000Z');
    renderWithZod({
      element: (
        <DateField
          name="x"
          min={min}
          slotProps={{ htmlInput: () => ({ 'data-testid': 'input' }) }}
        />
      ),
      schema: z.object({ x: z.date() }),
    });
    expect(screen.getByTestId('input')).toHaveAttribute(
      'min',
      '2020-01-01T00:00',
    );
  });

  test('<DateField> - allows overriding label `shrink` via `slotProps.inputLabel`', () => {
    renderWithZod({
      element: (
        <DateField
          name="x"
          label="Label"
          slotProps={{ inputLabel: { shrink: false } }}
        />
      ),
      schema: z.object({ x: z.date() }),
    });
    expect(screen.getByText('Label')).not.toHaveAttribute(
      'data-shrink',
      'true',
    );
  });
});
