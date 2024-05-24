import { screen } from '@testing-library/react';
import React from 'react';
import { wrapField } from 'uniforms-antd';
import { renderWithZod } from 'uniforms/__suites__';
import { z } from 'zod';

describe('wrapField tests', () => {
  test('<wrapField> - renders wrapper with extra style', () => {
    renderWithZod({
      element: wrapField(
        { wrapperStyle: { backgroundColor: 'red' } },
        <div data-testid="x" />,
      ),
      schema: z.object({}),
    });
    expect(
      screen.getByTestId('x').closest('.ant-form-item')?.getAttribute('style'),
    ).toBe('background-color: red;');
  });

  test('<wrapField> - renders wrapper with an error status (error)', () => {
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
  });

  test('<wrapField> - renders wrapper with label and info', () => {
    renderWithZod({
      element: wrapField({ label: 'Label', info: 'Info' }, <div />),
      schema: z.object({}),
    });
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
      'question-circle',
    );
  });

  test('<wrapField> - renders wrapper with a custom validateStatus', () => {
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
  });
});
