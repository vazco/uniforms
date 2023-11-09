import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

export function testSelectField(
  SelectField: ComponentType<any>,
  options?: {
    skipMuiTests?: boolean;
  },
) {
  skipTestIf(options?.skipMuiTests)('<SelectField> - renders a select', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    expect(screen.getAllByRole('combobox')).toHaveLength(1);
  });
}
