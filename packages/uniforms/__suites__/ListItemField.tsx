import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testListItemField(ListItemField: ComponentType<any>) {
  test('<ListItemField> - renders ListItemField', () => {
    renderWithZod({
      element: <ListItemField name="x" />,
      schema: z.object({ x: z.number() }),
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<ListItemField> - aaa', () => {
    renderWithZod({
      element: <ListItemField name="x" />,
      schema: z.object({ x: z.string() }),
      model: { x: 'Testttt' },
    });

    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'Testttt');
  });

  //   Bootstrap only
  test('<ListItemField> - renders custom del field', () => {
    renderWithZod({
      element: (
        <ListItemField
          name="x"
          removeIcon={<div data-testid="asdf">Test</div>}
        />
      ),
      schema: z.object({ x: z.string() }),
    });

    expect(screen.getByTestId('asdf')).toBeInTheDocument();
  });

  test('<ListItemField> - renders ListDelField', () => {
    renderWithZod({
      element: <ListItemField name="x" />,
      schema: z.object({ x: z.string() }),
    });

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('<ListItemField> - renders AutoField', () => {
    renderWithZod({
      element: <ListItemField name="x" />,
      schema: z.object({ x: z.number() }),
    });

    expect(screen.getAllByRole('spinbutton')).toHaveLength(1);
  });
}
