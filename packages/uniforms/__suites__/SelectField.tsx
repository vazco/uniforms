import { screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

export function testSelectField(
  SelectField: ComponentType<any>,
  options?: {
    skipInMuiTests?: boolean;
    antdTests?: boolean;
  },
) {
  test('<SelectField> - renders a select', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('X')).not.toBeNull();
    expect(screen.getByText('a')).not.toBeNull();
    if (!options?.antdTests && !options?.skipInMuiTests) {
      expect(screen.getByText('b')).not.toBeNull();
    }
  });

  test('<SelectField> - renders a select with correct disabled state', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const selectField = screen.getByTestId('select-field');
    if (options?.antdTests) {
      expect(selectField.classList.contains('ant-select-disabled')).toBe(true);
    } else if (options?.skipInMuiTests) {
      expect(
        screen.getByRole('button').classList.contains('Mui-disabled'),
      ).toBe(true);
    } else {
      expect(
        selectField.querySelector('select')?.getAttribute('disabled'),
      ).toBe('');
    }
  });

  // TODO: Add for MUI
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
      if (options?.antdTests) {
        expect(selectField.getAttribute('readonly')).toBe('');
      } else {
        selectField.querySelector('option')?.click();
        expect(onChange).not.toHaveBeenCalled();
      }
    },
  );

  test('<SelectField> - renders a select with correct id (inherited)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    let selectField: HTMLElement | HTMLSelectElement | null = null;
    if (options?.antdTests) {
      selectField = screen.getByRole('combobox');
    } else if (options?.skipInMuiTests) {
      selectField = screen.getByRole('button');
    } else {
      selectField = screen.getByTestId('select-field').querySelector('select');
    }
    expect(selectField?.getAttribute('id')).toBeTruthy();
  });

  test('<SelectField> - renders a select with correct id (specified)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    let selectField: HTMLElement | HTMLSelectElement | null = null;
    if (options?.antdTests) {
      selectField = screen.getByRole('combobox');
    } else if (options?.skipInMuiTests) {
      selectField = screen.getByRole('button');
    } else {
      selectField = screen.getByTestId('select-field').querySelector('select');
    }
    expect(selectField?.getAttribute('id')).toBe('y');
  });

  test('<SelectField> - renders a select with correct name', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const selectField = screen.getByTestId('select-field');
    if (options?.antdTests) {
      expect(selectField.getAttribute('name')).toBe('x');
    } else if (options?.skipInMuiTests) {
      expect(screen.getByText('X')).toBeInTheDocument();
    } else {
      const select = selectField.querySelector('select');
      expect(select?.getAttribute('name')).toBe('x');
    }
  });

  skipTestIf(options?.antdTests || options?.skipInMuiTests)(
    '<SelectField> - renders a select with correct options',
    () => {
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
    if (!options?.antdTests && !options?.skipInMuiTests) {
      expect(screen.getByText('ś')).toBeInTheDocument();
    }
  });

  test('<SelectField> - disabled items (options)', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    expect(select.querySelector('option')?.getAttribute('disabled')).toBeNull();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes =
      options?.skipInMuiTests || options?.antdTests
        ? screen.getByText('X').closest('body')?.querySelectorAll('input')
        : screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes =
      options?.skipInMuiTests || options?.antdTests
        ? screen.getByText('X').closest('body')?.querySelectorAll('input')
        : screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).toBeDisabled();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct readOnly state', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes onChange={onChange} name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes =
      options?.skipInMuiTests || options?.antdTests
        ? screen.getByText('X').closest('body')?.querySelectorAll('input')
        : screen.getAllByRole('checkbox');
    checkboxes?.[1].click();
    expect(onChange).not.toHaveBeenCalled();
  });

  // TODO: refactor a bit
  test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = options?.skipInMuiTests
      ? screen.getByText('X').closest('body')?.querySelectorAll('input')
      : options?.antdTests
      ? screen
          .getByText('X')
          .closest('body')
          ?.querySelectorAll('.ant-radio-group')
      : screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toHaveAttribute('id');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = options?.skipInMuiTests
      ? screen.getByText('X').closest('body')?.querySelectorAll('input')
      : options?.antdTests
      ? screen
          .getByText('X')
          .closest('body')
          ?.querySelectorAll('.ant-radio-group')
      : screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toHaveAttribute('id', 'y-YQ');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes =
      options?.antdTests || options?.skipInMuiTests
        ? screen.getByText('X').closest('body')?.querySelectorAll('input')
        : screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toHaveAttribute('name', 'x');
  });

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {});

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkbox =
      options?.antdTests || options?.skipInMuiTests
        ? screen.getByDisplayValue('b')
        : screen.getByRole('checkbox', { name: 'b' });
    expect(checkbox).not.toBeChecked();
    checkbox?.click();
    expect(checkbox).toBeChecked();
  });

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {});

  // test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {});

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'a' },
    });
    const checkbox =
      options?.antdTests || options?.skipInMuiTests
        ? screen.getByDisplayValue('a')
        : screen.getByRole('checkbox', { name: 'a' });
    checkbox?.click();
    screen.getByLabelText('a').click();
    expect(checkbox).toBeChecked();
  });

  test('<SelectField checkboxes> - renders a label', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('y')).toBeInTheDocument();
  });

  // TODO: Add for AntD
  skipTestIf(options?.antdTests)(
    '<SelectField checkboxes> - renders a wrapper with unknown props',
    () => {
      renderWithZod({
        element: (
          <SelectField
            checkboxes
            data-testid="select-field"
            name="x"
            data-x="x"
            data-y="y"
            data-z="z"
          />
        ),
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const field = screen.getByTestId('select-field');
      expect(field).toHaveAttribute('data-x', 'x');
      expect(field).toHaveAttribute('data-z', 'z');
      expect(field).toHaveAttribute('data-y', 'y');
    },
  );

  test('<SelectField checkboxes> - works with special characters', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['ă', 'ș']) }),
    });
    expect(screen.getByText('ă')).toBeInTheDocument();
    if (!options?.antdTests && !options?.skipInMuiTests) {
      expect(screen.getByText('ș')).toBeInTheDocument();
    }
  });

  test('<SelectField checkboxes> - disabled items (checkboxes)', () => {
    renderWithZod({
      element: (
        <SelectField
          checkboxes
          name="x"
          options={[
            { key: 'k1', label: 'A', value: 'a', disabled: true },
            { key: 'k2', label: 'B', value: 'b', disabled: false },
          ]}
        />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes =
      options?.antdTests || options?.skipInMuiTests
        ? screen.getByText('X').closest('body')?.querySelectorAll('input')
        : screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).not.toBeDisabled();
  });
}
