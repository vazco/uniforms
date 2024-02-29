import { fireEvent, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testSelectField(SelectField: ComponentType<any>) {
  test('<SelectField> - renders a select', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByTestId('select-field')).toBeInTheDocument();
  });

  test('<SelectField> - renders a select with correct disabled state', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('select');
    expect(select?.getAttribute('disabled')).toBe('');
  });

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

  test('<SelectField> - renders a select which correctly reacts on change (uncheck) by value', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('<SelectField> - renders a select which correctly reacts on change (uncheck) by selectedIndex', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { selectedIndex: -1 } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  // FIXME: This test is not working as expected
  // test('<SelectField checkboxes> - renders a set of inline checkboxes', () => {
  //   renderWithZod({
  //     element: <SelectField checkboxes inline name="x" />,
  //     schema: z.object({ x: z.enum(['a', 'b']) }),
  //   });
  //   expect(
  //     screen.getByLabelText('X').closest('.form-check-inline'),
  //   ).toBeInTheDocument();
  // });

  // FIXME: This test is not working as expected
  // test.only('<SelectField> - renders a select which correctly reacts on change (first value)', () => {
  //   const onChange = jest.fn();
  //   renderWithZod({
  //     element: (
  //       <SelectField
  //         data-testid="select"
  //         fieldType={Array}
  //         name="x"
  //         onChange={onChange}
  //       />
  //     ),
  //     schema: z.object({ x: z.enum(['a', 'b']) }),
  //   });
  //   const select = screen.getByTestId('select');
  //   fireEvent.change(select, { target: { value: 'a' } });
  //   expect(onChange).toHaveBeenCalledWith(['a']);
  // });

  // FIXME: This test is not working as expected
  // test.only('<SelectField> - renders a select which correctly reacts on change (next value)', () => {
  //   const onChange = jest.fn();
  //   renderWithZod({
  //     element: (
  //       <SelectField
  //         data-testid="select"
  //         fieldType={Array}
  //         value={['a']}
  //         name="x"
  //         onChange={onChange}
  //       />
  //     ),
  //     schema: z.object({ x: z.enum(['a', 'b']) }),
  //   });
  //   const select = screen.getByTestId('select');
  //   fireEvent.change(select, { target: { value: 'b' } });
  //   expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  // });

  test('<SelectField> - renders a select which correctly reacts on change (uncheck) by value', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('<SelectField> - renders a select which correctly reacts on change (uncheck) by selectedIndex', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { selectedIndex: -1 } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('<SelectField> - renders a select with correct id (inherited)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('select');
    expect(select?.getAttribute('id')).toBeTruthy();
  });

  test('<SelectField> - renders a select with correct id (specified)', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('select');
    expect(select?.getAttribute('id')).toBe('y');
  });

  test('<SelectField> - renders a select with correct name', () => {
    renderWithZod({
      element: <SelectField data-testid="select-field" name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByTestId('select-field').querySelector('select');
    expect(select?.getAttribute('name')).toBe('x');
  });

  test('<SelectField> - renders a select with correct options', () => {
    const selectOptions = ['a', 'b'] as const;
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(selectOptions) }),
    });
    selectOptions.forEach(option => {
      expect(screen.getByText(option)).not.toBeNull();
    });
  });

  test('<SelectField> - renders a select with correct options (transform)', () => {
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
    selectOptions.forEach(option => {
      expect(screen.getByText(option.toUpperCase())).toBeInTheDocument();
    });
  });

  test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
    renderWithZod({
      element: <SelectField name="x" placeholder="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('y')).toBeInTheDocument();
  });

  test('<SelectField> - renders a select with correct value (default)', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('a');
  });

  test('<SelectField> - renders a select with correct value (model)', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('b');
  });

  test('<SelectField> - renders a select with correct value (specified)', () => {
    renderWithZod({
      element: <SelectField name="x" value="b" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('b');
  });

  test('<SelectField> - renders a select which correctly reacts on change', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
  });

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

  test('<SelectField> - works with special characters', () => {
    renderWithZod({
      element: <SelectField name="x" />,
      schema: z.object({ x: z.enum(['ă', 'ś']) }),
    });
    expect(screen.getByText('ă')).toBeInTheDocument();
    expect(screen.getByText('ś')).toBeInTheDocument();
  });

  test('<SelectField> - disabled items (options)', () => {
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
  });

  test('<SelectField checkboxes> - renders a set of checkboxes', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" disabled />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).toBeDisabled();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct readOnly state', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes onChange={onChange} name="x" readOnly />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes?.[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toHaveAttribute('id');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" id="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toHaveAttribute('id', 'y-YQ');
    expect(checkboxes?.[1]).toHaveAttribute('id', 'y-Yg');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
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
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toBeChecked();
    expect(checkboxes?.[1]).not.toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).not.toBeChecked();
    expect(checkboxes?.[1]).toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" value="b" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).not.toBeChecked();
    expect(checkboxes?.[1]).toBeChecked();
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes?.[1]);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <SelectField checkboxes name="x" onChange={onChange} />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
      model: { x: 'b' },
    });
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes?.[1]);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {
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
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes?.[1]);
    expect(onChange).toHaveBeenCalledWith(['b']);
    fireEvent.click(checkboxes?.[0]);
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
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
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes?.[0]);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test('<SelectField checkboxes> - renders a label', () => {
    renderWithZod({
      element: <SelectField checkboxes name="x" label="y" />,
      schema: z.object({ x: z.enum(['a', 'b']) }),
    });
    expect(screen.getByText('y')).toBeInTheDocument();
  });

  test('<SelectField checkboxes> - renders a wrapper with unknown props', () => {
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
  });

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
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes?.[0]).toBeDisabled();
    expect(checkboxes?.[1]).not.toBeDisabled();
  });
}
