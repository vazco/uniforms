import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithZod } from 'uniforms/__suites__';
import { wrapField } from 'uniforms-bootstrap5';
import { z } from 'zod';

describe('wrapField tests', () => {
  test('<wrapField> - renders wrapper with correct class', () => {
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
  });
});
