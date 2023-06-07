import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

export function testNestField(
  NestField: ComponentType<any>,
  options?: {
    skipForMui?: boolean;
    skipErrorMessageTests?: boolean;
    skipShowInlineErrorTests?: boolean;
  },
) {
  test('<NestField> - renders an <AutoField> for each field', () => {
    renderWithZod({
      element: <NestField name="x" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('<NestField> - renders custom content if given', () => {
    renderWithZod({
      element: (
        <NestField name="x">
          <article data-test="content" />
        </NestField>
      ),
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveAttribute('data-test', 'content');
  });

  test('<NestField> - renders a label', () => {
    renderWithZod({
      element: <NestField name="x" label="y" />,
      schema: z.object({
        x: z.object({
          a: z.string(),
          b: z.number(),
        }),
      }),
    });

    expect(screen.getByText('y')).toBeInTheDocument();
  });

  skipTestIf(options?.skipForMui)(
    '<NestField> - renders a wrapper with unknown props',
    () => {
      renderWithZod({
        element: (
          <NestField
            data-testid="x"
            name="x"
            data-x="x"
            data-y="y"
            data-z="z"
          />
        ),
        schema: z.object({
          x: z.object({
            a: z.string(),
            b: z.number(),
          }),
        }),
      });

      const field = screen.getAllByTestId('x')[0];

      expect(field).toHaveAttribute('data-x', 'x');
      expect(field).toHaveAttribute('data-z', 'z');
      expect(field).toHaveAttribute('data-y', 'y');
    },
  );

  skipTestIf(options?.skipErrorMessageTests)(
    '<NestField> - renders correct error text (specified)',
    () => {
      const error = new Error();

      renderWithZod({
        element: (
          <NestField
            name="x"
            error={error}
            showInlineError
            errorMessage="Error"
          />
        ),
        schema: z.object({
          x: z.object({
            a: z.string(),
            b: z.number(),
          }),
        }),
      });

      expect(screen.getByText('Error')).toBeInTheDocument();
    },
  );

  skipTestIf(!options?.skipShowInlineErrorTests)(
    '<NestField> - renders correct error text (showInlineError=false)',
    () => {
      const error = new Error();

      renderWithZod({
        element: (
          <NestField
            name="x"
            error={error}
            showInlineError={false}
            errorMessage="Error"
          />
        ),
        schema: z.object({ x: z.object({ a: z.string(), b: z.number() }) }),
      });

      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    },
  );
}
