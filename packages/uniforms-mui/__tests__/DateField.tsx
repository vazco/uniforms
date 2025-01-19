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
