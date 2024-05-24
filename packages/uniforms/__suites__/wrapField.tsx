import { screen } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

export function testWrapField(
  wrapField: (wrapperProps: any, children: ReactNode) => ReactElement,
  options?: {
    skipForMUI?: boolean;
    skipForAntD?: boolean;
  },
) {
  skipTestIf(options?.skipForMUI || options?.skipForAntD)(
    '<wrapField> - renders wrapper with correct class',
    () => {
      renderWithZod({
        element: wrapField(
          { wrapClassName: 'container' },
          <div data-testid="x" />,
        ),
        schema: z.object({}),
      });
      expect(
        screen.getByTestId('x').parentElement?.classList.contains('container'),
      ).toBe(true);
    },
  );

  test('<wrapField> - renders help block', () => {
    renderWithZod({
      element: wrapField(
        options?.skipForMUI ? { helperText: 'Hint' } : { help: 'Hint' },
        <div />,
      ),
      schema: z.object({}),
    });
    expect(screen.getByText('Hint')).toBeInTheDocument();
  });

  skipTestIf(options?.skipForMUI || options?.skipForAntD)(
    '<wrapField> - renders help block with specified class',
    () => {
      renderWithZod({
        element: wrapField(
          { help: 'Hint', helpClassName: 'text-hint' },
          <div />,
        ),
        schema: z.object({}),
      });
      const span = screen.getByText('Hint');
      expect(span.classList.contains('text-hint')).toBe(true);
    },
  );

  test('<wrapField> - renders error block (showInlineError=true)', () => {
    const error = new Error();
    renderWithZod({
      element: wrapField(
        { error, showInlineError: true, errorMessage: 'Error' },
        <div />,
      ),
      schema: z.object({}),
    });
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  skipTestIf(options?.skipForMUI)(
    '<wrapField> - renders wrapper with label',
    () => {
      renderWithZod({
        element: wrapField({ label: 'Label' }, <div />),
        schema: z.object({}),
      });
      expect(screen.getByText('Label')).toBeInTheDocument();
    },
  );

  skipTestIf(options?.skipForMUI || options?.skipForAntD)(
    '<wrapField> - label has custom class (String)',
    () => {
      renderWithZod({
        element: wrapField(
          { label: 'A field label', labelClassName: 'custom-label-class' },
          <div />,
        ),
        schema: z.object({}),
      });
      const label = screen.getByText('A field label');
      expect(label.classList.contains('custom-label-class')).toBe(true);
    },
  );

  skipTestIf(options?.skipForMUI || options?.skipForAntD)(
    '<wrapField> - label has custom class (Array[String])',
    () => {
      renderWithZod({
        element: wrapField(
          { label: 'A field label', labelClassName: ['custom-1', 'custom-2'] },
          <div />,
        ),
        schema: z.object({}),
      });
      const label = screen.getByText('A field label');
      expect(label.classList.contains('custom-1')).toBe(true);
      expect(label.classList.contains('custom-2')).toBe(true);
    },
  );

  skipTestIf(options?.skipForMUI)(
    '<wrapField> - renders wrapper with extra text',
    () => {
      renderWithZod({
        element: wrapField({ extra: 'Extra' }, <div data-testid="x" />),
        schema: z.object({}),
      });
      if (options?.skipForAntD) {
        expect(screen.getByText('Extra')).toBeInTheDocument();
      } else {
        expect(screen.getByTestId('x').parentElement).toHaveAttribute('extra');
      }
    },
  );

  skipTestIf(options?.skipForMUI)(
    '<wrapField> - renders error block (showInlineError=false)',
    () => {
      const error = new Error();
      renderWithZod({
        element: wrapField(
          { error, showInlineError: false, errorMessage: 'Error' },
          <div data-testid="x" />,
        ),
        schema: z.object({}),
      });
      const x = screen.getByTestId('x');
      expect(
        x.closest('.ant-form-item-has-error, .is-invalid'),
      ).toBeInTheDocument();
    },
  );
}
