import { fireEvent, screen, Screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';
import { skipTestIf } from './skipTestIf';

function getSelectFields() {
  const fields = screen.queryAllByRole('checkbox');
  if (fields.length > 0) {
    return fields;
  }

  return screen.getAllByRole('radio');
}

export function testSelectField(
  SelectField: ComponentType<any>,
  options?: {
    theme?: 'antd' | 'mui';
    showInlineError?: boolean;
    getCheckboxInlineOption?: (screen: Screen) => Element | null;
    reverseCheckboxOrder?: false;
  },
) {
  const isTheme = (themes: string[]) => themes.includes(options?.theme ?? '');

  test('<SelectField> - renders a select', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByTestId('select-field')).toBeInTheDocument();
  });

  test('<SelectField> - renders a label', () => {
    renderWithZod({
      element: <SelectField name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByLabelText(/y\*?/)).toBeInTheDocument();
  });

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - renders a select with correct disabled state',
    () => {
      renderWithZod({
        element: <SelectField data-testid="select-field" name="x" disabled />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    },
  );

  test('<SelectField> - renders a select with correct readOnly state', () => {
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
    const option = screen.getByTestId('select-field').querySelector('option');
    option?.click();
    expect(onChange).not.toHaveBeenCalled();
  });

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - ignores selection with readOnly state ',
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
      const select = screen.getByTestId('select-field').querySelector('select');
      fireEvent.change(select!, { target: { value: 'b' } });
      expect(onChange).not.toHaveBeenCalled();
    },
  );

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - (multiple) renders a select which correctly reacts on change (uncheck) by value',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField fieldType={Array} name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('listbox');
      fireEvent.change(select, { target: { value: '' } });
      expect(onChange).toHaveBeenCalledWith([]);
    },
  );

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - (multiple) renders a select which correctly reacts on change (uncheck) by selectedIndex',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField fieldType={Array} name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('listbox');
      fireEvent.change(select, { target: { selectedIndex: -1 } });
      expect(onChange).toHaveBeenCalledWith([]);
    },
  );

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - (multiple) renders a select which correctly reacts on change (checked) by selectedIndex',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField fieldType={Array} name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('listbox');
      fireEvent.change(select, { target: { selectedIndex: 0 } });
      expect(onChange).toHaveBeenCalledWith(['a']);
    },
  );

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - renders a select which correctly reacts on change (uncheck) by value',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: '' } });
      expect(onChange).toHaveBeenCalledWith(undefined);
    },
  );

  skipTestIf(isTheme(['mui', 'antd']))(
    '<SelectField> - renders a select which correctly reacts on change (uncheck) by selectedIndex',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { selectedIndex: -1 } });
      expect(onChange).toHaveBeenCalledWith(undefined);
    },
  );

  test('<SelectField> - renders a select with correct id (inherited)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('[id]');
    expect(select?.getAttribute('id')).toBeTruthy();
  });

  test('<SelectField> - renders a select with correct id (specified)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('[id="y"]');
    expect(select?.getAttribute('id')).toBe('y');
  });

  test('<SelectField> - renders a select with correct name', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field');
    const elementWithAttribute = select.querySelector('[name="x"]') || select;
    expect(elementWithAttribute?.getAttribute('name')).toBe('x');
  });

  skipTestIf(isTheme(['mui']))(
    '<SelectField> - renders a select with correct options',
    () => {
      const selectOptions = ['a', 'b'] as const;
      renderWithZod({
        element: <SelectField name="x" />,
        schema: z.object({ x: z.enum(selectOptions) }),
      });
      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);
      selectOptions.forEach(option => {
        expect(screen.getByRole('option', { name: option })).not.toBeNull();
      });
    },
  );

  skipTestIf(isTheme(['mui']))(
    '<SelectField> - renders a select with correct options (transform)',
    () => {
      const selectOptions = ['a', 'b'] as const;
      renderWithZod({
        element: (
          <SelectField
            name="x"
            options={[
              { key: 'k1', label: 'A', value: 'a' },
              { key: 'k2', label: 'B', value: 'b' },
            ]}
          />
        ),
        schema: z.object({ x: z.enum(selectOptions) }),
      });
      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);
      selectOptions.forEach(option => {
        expect(
          screen.getByRole('option', { name: option.toUpperCase() }),
        ).toBeInTheDocument();
      });
    },
  );

  test('<SelectField> - renders a select with correct placeholder (fallback)', () => {
    renderWithZod({
      element: <SelectField name="x" label="y" placeholder="" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.queryByPlaceholderText('y')).not.toBeInTheDocument();
  });

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select with correct placeholder (implicit)',
    () => {
      renderWithZod({
        element: <SelectField name="x" placeholder="y" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      expect(screen.getByText('y')).toBeInTheDocument();
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select with correct value (default)',
    () => {
      renderWithZod({
        element: <SelectField name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      if (options?.theme === 'antd') {
        expect(screen.queryByText('a')).not.toBeInTheDocument();
        expect(screen.queryByText('b')).not.toBeInTheDocument();
      } else {
        expect(select).not.toHaveValue();
      }
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select with missing value (model)',
    () => {
      renderWithZod({
        element: <SelectField name="x" value={undefined} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('');
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select with correct value (model)',
    () => {
      renderWithZod({
        element: <SelectField name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
        model: { x: 'b' },
      });
      const select = screen.getByRole('combobox');
      if (options?.theme === 'antd') {
        expect(screen.getByText('b')).toBeInTheDocument();
        expect(screen.queryByText('a')).not.toBeInTheDocument();
      } else {
        expect(select).toHaveValue('b');
      }
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select with correct value (specified)',
    () => {
      renderWithZod({
        element: <SelectField name="x" value="b" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      if (options?.theme === 'antd') {
        expect(screen.getByText('b')).toBeInTheDocument();
        expect(screen.queryByText('a')).not.toBeInTheDocument();
      } else {
        expect(select).toHaveValue('b');
      }
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select which correctly reacts on change',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'b' } });
      expect(onChange).toHaveBeenCalledWith('b');
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select which correctly reacts on change (empty)',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: '' } });
      expect(onChange).toHaveBeenLastCalledWith(undefined);
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - renders a select which correctly reacts on change (same value)',
    () => {
      const onChange = jest.fn();
      renderWithZod({
        element: <SelectField name="x" onChange={onChange} />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
        model: { x: 'b' },
      });
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'b' } });
      expect(onChange).toHaveBeenCalledWith('b');
    },
  );

  test('<SelectField> - renders a wrapper with unknown props', () => {
    renderWithZod({
      element: (
        <SelectField
          data-testid="select-field"
          data-x="x"
          data-y="y"
          data-z="z"
          name="x"
        />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const field = screen.getByTestId('select-field');
    expect(field).toHaveAttribute('data-x', 'x');
    expect(field).toHaveAttribute('data-z', 'z');
    expect(field).toHaveAttribute('data-y', 'y');
  });

  skipTestIf(isTheme(['mui']))(
    '<SelectField> - works with special characters',
    () => {
      renderWithZod({
        element: <SelectField name="x" />,
        schema: z.object({ x: z.enum(['ă', 'ś']) }),
      });
      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);
      expect(screen.getAllByText('ă')[0]).toBeInTheDocument();
      expect(screen.getAllByText('ś')[0]).toBeInTheDocument();
    },
  );

  skipTestIf(isTheme(['antd', 'mui']))(
    '<SelectField> - disabled items (options)',
    () => {
      renderWithZod({
        element: (
          <SelectField
            name="x"
            options={[
              { key: 'k1', label: 'A', value: 'a', disabled: true },
              { key: 'k2', label: 'B', value: 'b', disabled: false },
            ]}
          />
        ),
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      expect(screen.getByText('A')).toBeDisabled();
      expect(screen.getByText('B')).not.toBeDisabled();
    },
  );

  test('<SelectField checkboxes> - renders a set of checkboxes', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    const fields = getSelectFields();

    expect(
      fields.filter(element => element instanceof HTMLInputElement),
    ).toHaveLength(2);
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });

    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );

    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).toBeDisabled();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct readOnly state', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes onChange={onChange} name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    fireEvent.click(fields?.[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  skipTestIf(!options?.getCheckboxInlineOption)(
    '<SelectField checkboxes> - renders a set of inline checkboxes',
    () => {
      renderWithZod({
        element: <SelectField checkboxes inline name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      expect(options?.getCheckboxInlineOption?.(screen)).toBeInTheDocument();
    },
  );

  skipTestIf(isTheme(['antd']))(
    '<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)',
    () => {
      renderWithZod({
        element: <SelectField checkboxes name="x" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const fields = getSelectFields();
      expect(fields?.[0]).toHaveAttribute('id');
    },
  );

  skipTestIf(isTheme(['antd']))(
    '<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)',
    () => {
      renderWithZod({
        element: <SelectField checkboxes name="x" id="y" />,
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });
      const fields = getSelectFields();
      const checkboxes = fields.filter(
        element => element instanceof HTMLInputElement,
      );
      expect(checkboxes?.[0]).toHaveAttribute('id', 'y-YQ');
      expect(checkboxes?.[1]).toHaveAttribute('id', 'y-Yg');
    },
  );

  test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );
    expect(checkboxes?.[0]).toHaveAttribute('name', 'x');
    expect(checkboxes?.[1]).toHaveAttribute('name', 'x');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {
    renderWithZod({
      element: (
        <SelectField
          checkboxes
          name="x"
          options={[
            { key: 'k1', label: 'A', value: 'a' },
            { key: 'k2', label: 'B', value: 'b' },
          ]}
        />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );
    expect(checkboxes?.[0]).not.toBeChecked();
    expect(checkboxes?.[1]).not.toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );
    expect(checkboxes?.[0]).not.toBeChecked();
    expect(checkboxes?.[1]).toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" value="b" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );
    expect(checkboxes?.[0]).not.toBeChecked();
    expect(checkboxes?.[1]).toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );

    fireEvent.click(checkboxes?.[1]);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'a' },
    });
    let field = screen.queryByRole('checkbox', { name: 'b' });
    if (!field) {
      field = screen.getByRole('radio', { name: 'b' });
    }
    fireEvent.click(field);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('<SelectField checkboxes> - (multiple) renders a set of checkboxes which correctly reacts on change (array check)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: (
        <SelectField
          fieldType={Array}
          value={[]}
          checkboxes
          name="x"
          onChange={onChange}
        />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    fireEvent.click(fields?.[1]);
    expect(onChange).toHaveBeenCalledWith(['b']);
    fireEvent.click(fields?.[0]);
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  test('<SelectField checkboxes> - (multiple) renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: (
        <SelectField
          fieldType={Array}
          value={['a']}
          checkboxes
          name="x"
          onChange={onChange}
        />
      ),
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const fields = getSelectFields();
    fireEvent.click(fields?.[0]);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test('<SelectField checkboxes> - renders a label', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('y')).toBeInTheDocument();
  });

  // TODO: Fix me - MUI renders multiple checkboxes and wrappers with the same id
  skipTestIf(isTheme(['mui']))(
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
      const field = screen.getAllByTestId('select-field')[0];
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
    expect(screen.getByText('ș')).toBeInTheDocument();
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
    const fields = getSelectFields();
    const checkboxes = fields.filter(
      element => element instanceof HTMLInputElement,
    );
    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).not.toBeDisabled();
  });

  skipTestIf(!options?.showInlineError)(
    '<SelectField> - renders correct error text (specified)',
    () => {
      const error = new Error();
      renderWithZod({
        element: (
          <>
            <SelectField
              data-testid="select"
              name="x"
              error={error}
              showInlineError
              errorMessage="Error"
            />
          </>
        ),
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });

      expect(screen.getByText('Error')).toBeInTheDocument();
    },
  );

  skipTestIf(options?.showInlineError !== false)(
    '<SelectField> - renders correct error text (showInlineError=false)',
    () => {
      const error = new Error();
      renderWithZod({
        element: (
          <>
            <SelectField name="x" error={error} errorMessage="Error" />
          </>
        ),
        schema: z.object({ x: z.enum(['a', 'b']) }),
      });

      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    },
  );
}
