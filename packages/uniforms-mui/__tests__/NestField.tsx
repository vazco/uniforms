import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithZod } from 'uniforms/__suites__';
import { NestField } from 'uniforms-mui';
import { z } from 'zod';

describe.skip('@RTL - NestField tests', () => {
  test('<NestField> - renders a label (required annotation)', () => {
    const { container } = renderWithZod({
      element: <NestField name="x" label="y" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    const label = container.getElementsByTagName('legend')[0]?.textContent;

    expect(label).toBe('y *');
  });

  test('<NestField> - renders a helperText', () => {
    renderWithZod({
      element: <NestField name="x" helperText="Helper" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    expect(screen.getByText('Helper')).toBeInTheDocument();
  });
});
