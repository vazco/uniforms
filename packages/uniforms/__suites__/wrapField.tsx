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
    onlyForBootstrap3?: boolean;
  },
) {
  skipTestIf(!options?.onlyForBootstrap3)(
    '<wrapField> - renders wrapper with (feedbackable=true)',
    () => {
      const error = new Error();
      renderWithZod({
        element: wrapField(
          { error, feedbackable: true },
          <div data-testid="x" />,
        ),
        schema: z.object({}),
      });
      const x = screen.getByTestId('x');
      expect(x.parentElement?.classList.contains('has-feedback')).toBe(true);
      expect(
        x.nextElementSibling?.classList.contains('form-control-feedback'),
      ).toBe(true);
    },
  );

  skipTestIf(!options?.skipForMUI)('<wrapField> - renders wrapper', () => {
    renderWithZod({
      element: wrapField({}, <div data-testid="x" />),
      schema: z.object({}),
    });
    expect(
      screen
        .getByTestId('x')
        .parentElement?.classList.contains('MuiFormControl-root'),
    ).toBe(true);
  });

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

  test('<wrapField> - renders error block', () => {
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

  skipTestIf(!options?.skipForAntD)(
    '<wrapField> - renders wrapper with a custom validateStatus',
    () => {
      renderWithZod({
        element: wrapField(
          { validateStatus: 'success' },
          <div data-testid="x" />,
        ),
        schema: z.object({}),
      });
      expect(
        screen
          .getByTestId('x')
          .closest('.ant-form-item-has-feedback.ant-form-item-has-success'),
      ).toBeInTheDocument();
    },
  );

  skipTestIf(!options?.skipForAntD)(
    '<wrapField> - renders wrapper with extra style',
    () => {
      renderWithZod({
        element: wrapField(
          { wrapperStyle: { backgroundColor: 'red' } },
          <div data-testid="x" />,
        ),
        schema: z.object({}),
      });
      expect(
        screen
          .getByTestId('x')
          .closest('.ant-form-item')
          ?.getAttribute('style'),
      ).toBe('background-color: red;');
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

  skipTestIf(!options?.skipForAntD)(
    '<wrapField> - renders wrapper with an error status (error)',
    () => {
      const error = new Error();
      renderWithZod({
        element: wrapField({ error }, <div data-testid="x" />),
        schema: z.object({}),
      });
      expect(
        screen
          .getByTestId('x')
          .closest('.ant-form-item-has-feedback.ant-form-item-has-error'),
      ).toBeInTheDocument();
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
      if (options?.skipForAntD) {
        expect(
          x.closest('.ant-form-item-has-feedback.ant-form-item-has-error'),
        ).toBeInTheDocument();
      } else {
        expect(
          x.parentElement?.classList.contains(
            options?.onlyForBootstrap3 ? 'has-error' : 'is-invalid',
          ),
        ).toBe(true);
      }
    },
  );

  skipTestIf(!options?.skipForAntD)(
    '<wrapField> - renders wrapper with label and info',
    () => {
      renderWithZod({
        element: wrapField({ label: 'Label', info: 'Info' }, <div />),
        schema: z.object({}),
      });
      expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
        'question-circle',
      );
    },
  );
}
