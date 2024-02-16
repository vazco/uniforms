import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testListItemField(ListItemField: ComponentType<any>) {
  test('<ListItemField> - works', () => {
    renderWithZod({
      element: <ListItemField name="field" />,
      schema: z.object({ field: z.string().optional() }),
    });

    expect(screen.getByLabelText('Field')).toBeInTheDocument();
  });

  test('<ListItemField> - renders ListDelField', () => {
    renderWithZod({
      element: <ListItemField name="field" />,
      schema: z.object({ field: z.string() }),
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<ListItemField> - renders AutoField', () => {
    const AutoField = jest.fn(() => null) as React.FC<any>;

    renderWithZod({
      element: (
        <ListItemField name="field">
          <AutoField />
        </ListItemField>
      ),
      schema: z.object({
        field: z.string(),
      }),
    });

    expect(AutoField).toHaveBeenCalledTimes(1);
  });

  test('<ListItemField> - renders children if specified', () => {
    const Child = jest.fn(() => <div />) as React.FC<any>;

    renderWithZod({
      element: (
        <ListItemField name="field">
          <Child />
        </ListItemField>
      ),
      schema: z.object({ field: z.string() }),
    });

    expect(Child).toHaveBeenCalledTimes(1);
  });
}
