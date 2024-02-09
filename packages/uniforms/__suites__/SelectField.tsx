import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

export function testSelectField(
  SelectField: ComponentType<any>,
  options?: {
    skipInMuiTests?: boolean;
    skipInAntdTests?: boolean;
  },
) {
  skipTestIf(options?.skipInMuiTests)(
    '<SelectField> - renders a select',
    () => {
      renderWithZod({
        element: <SelectField data-testid="select-field" name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      expect(screen.getByText('X')).not.toBeNull();
      expect(screen.getByText('a')).not.toBeNull();
    },
  );

  skipTestIf(options?.skipInMuiTests)(
    '<SelectField> - renders a select with correct disabled state',
    () => {
      renderWithZod({
        element: <SelectField data-testid="select-field" name="x" disabled />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      if (options?.skipInAntdTests) {
        const selectField = screen.getByTestId('select-field');
        expect(selectField?.getAttribute('name')).toBe('x');
      } else {
        const selectField = screen.getByTestId('select-field');
        const select = selectField.querySelector('select');
        expect(select?.getAttribute('disabled')).toBe('');
      }
    },
  );

  skipTestIf(options?.skipInMuiTests)(
    '<SelectField> - renders a select with correct readOnly state',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: (
          <SelectField
            onChange={onChange}
            data-testid="select-field"
            name="x"
            readOnly
          />
        ),
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const selectField = screen.getByTestId('select-field');
      if (options?.skipInAntdTests) {
        expect(selectField.getAttribute('readonly')).toBe('');
      } else {
        const option = selectField.querySelector('option');
        option?.click();
        expect(onChange).not.toHaveBeenCalled();
      }
    },
  );

  // test('<SelectField> - renders a select with correct id (inherited)', () => {});

  // test('<SelectField> - renders a select with correct id (specified)', () => {});

  skipTestIf(options?.skipInMuiTests)(
    '<SelectField> - renders a select with correct name',
    () => {
      renderWithZod({
        element: <SelectField data-testid="select-field" name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const selectField = screen.getByTestId('select-field');
      if (options?.skipInAntdTests) {
        expect(selectField.getAttribute('name')).toBe('x');
      } else {
        const select = selectField.querySelector('select');
        expect(select?.getAttribute('name')).toBe('x');
      }
    },
  );

  skipTestIf(options?.skipInMuiTests || options?.skipInAntdTests)(
    '<SelectField> - renders a select with correct options',
    () => {
      // TODO: Add test for AntD
      const selectOptions = ['a', 'b'] as const;
      renderWithZod({
        element: <SelectField name="x" />,
        schema: z.object({ x: z.enum(selectOptions) }),
      });
      selectOptions.forEach(option => {
        expect(screen.getByText(option)).not.toBeNull();
      });
    },
  );

  // test('<SelectField> - renders a select with correct options (transform)', () => {});

  // test('<SelectField> - renders a select with correct placeholder (implicit)', () => {});

  // test('<SelectField> - renders a select with correct value (default)', () => {});

  // test('<SelectField> - renders a select with correct value (model)', () => {});

  // test('<SelectField> - renders a select with correct value (specified)', () => {});

  // test('<SelectField> - renders a select which correctly reacts on change', () => {});

  // test('<SelectField> - renders a select which correctly reacts on change (array)', () => {});

  // test('<SelectField> - renders a select (undefined values)', () => {});

  // test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {});

  // test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {});

  // test('<SelectField> - renders a wrapper with unknown props', () => {});

  test('<SelectField> - works with special characters', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['ă', 'ś']) }),
    });
    expect(screen.getByText('ă')).toBeInTheDocument();
  });

  // test('<SelectField> - disabled items (options)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct readOnly state', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {});

  test('<SelectField checkboxes> - renders a label', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('y')).toBeInTheDocument();
  });

  // test('<SelectField checkboxes> - renders a wrapper with unknown props', () => {});

  test('<SelectField checkboxes> - works with special characters', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['ă', 'ș']) }),
    });
    expect(screen.getByText('ă')).toBeInTheDocument();
  });

  // test('<SelectField checkboxes> - disabled items (checkboxes)', () => {});
}
