import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testListItemField(
  ListItemField: ComponentType<any>,
  options?: {
    isSelectCombobox?: boolean;
    useInputAsSelectField?: boolean;
  },
) {
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
    const { container } = renderWithZod({
      element: (
        <>
          <ListItemField name="string" />
          <ListItemField name="number" />
          <ListItemField name="select" />
        </>
      ),
      schema: z.object({
        string: z.string(),
        number: z.number(),
        select: z.enum(['a', 'b']),
      }),
    });

    if (options?.useInputAsSelectField) {
      expect(container.getElementsByTagName('input')).toHaveLength(3);

      if (options?.isSelectCombobox) {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      } else {
        expect(container.getElementsByTagName('input')?.[2]).toHaveAttribute(
          'name',
          'select',
        );
      }
    } else {
      expect(container.getElementsByTagName('input')).toHaveLength(2);
      expect(container.getElementsByTagName('select')).toHaveLength(1);
    }
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
