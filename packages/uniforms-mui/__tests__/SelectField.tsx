import { fireEvent, screen, within } from '@testing-library/react';
import React from 'react';
import { SelectField } from 'uniforms-mui';
import { renderWithZod } from 'uniforms/__suites__';
import { z } from 'zod';

test('<SelectField> - renders a Select with correct disabled state', () => {
  renderWithZod({
    element: <SelectField data-testid="select-field" name="x" disabled />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(
    screen.getByTestId('select-field').classList.contains('Mui-disabled'),
  ).toBeTruthy();
});

test('<SelectField> - renders a Select with correct required state', () => {
  renderWithZod({
    element: <SelectField data-testid="select-field" name="x" required />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('X *')).toBeInTheDocument();
});

test('<SelectField> - renders a Select with correct options', () => {
  const selectOptions = ['a', 'b'] as const;
  renderWithZod({
    element: <SelectField name="x" />,
    schema: z.object({ x: z.enum(selectOptions) }),
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));

  selectOptions.forEach(option => {
    expect(listbox.getByRole('option', { name: option })).not.toBeNull();
  });
});

test('<SelectField> - renders a Select with correct options (transform)', () => {
  const selectOptions = ['a', 'b'] as const;
  renderWithZod({
    element: (
      <SelectField name="x" options={[{ value: 'a' }, { value: 'b' }]} />
    ),
    schema: z.object({ x: z.string() }),
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));

  selectOptions.forEach(option => {
    expect(listbox.getByRole('option', { name: option })).toBeInTheDocument();
  });
});

test('<SelectField> - renders a Select with correct placeholder (implicit)', () => {
  renderWithZod({
    element: (
      <SelectField
        name="x"
        placeholder="y"
        options={[{ value: 'a' }, { value: 'b' }]}
      />
    ),
    schema: z.object({ x: z.string() }),
  });
  expect(screen.getByText('y')).toBeInTheDocument();
});

test('<SelectField> - renders a Select with correct value (default)', () => {
  renderWithZod({
    element: <SelectField data-testid="select-field" name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByText('a')).toBeInTheDocument();
  expect(screen.queryByText('b')).not.toBeInTheDocument();
});

test('<SelectField> - renders a Select with correct value (model)', () => {
  renderWithZod({
    element: <SelectField data-testid="select-field" name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
    model: { x: 'b' },
  });

  expect(screen.getByText('b')).toBeInTheDocument();
  expect(screen.queryByText('a')).not.toBeInTheDocument();
});

test('<SelectField> - renders a Select with correct value (specified)', () => {
  renderWithZod({
    element: <SelectField data-testid="select-field" name="x" value="b" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
    model: { x: 'b' },
  });

  expect(screen.getByText('b')).toBeInTheDocument();
  expect(screen.queryByText('a')).not.toBeInTheDocument();
});

test('<SelectField> - renders a Select which correctly reacts on change', () => {
  const onChange = jest.fn();
  renderWithZod({
    element: <SelectField name="x" onChange={onChange} />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));
  fireEvent.click(listbox.getByText(/b/i));

  expect(onChange).toHaveBeenCalledWith('b');
});

test('<SelectField> - renders a Select which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();
  renderWithZod({
    element: <SelectField name="x" onChange={onChange} />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
    model: { x: 'b' },
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));

  fireEvent.click(listbox.getByText(/b/i));

  expect(onChange).toBeCalledTimes(0);
});

test('<SelectField> - works with special characters', () => {
  renderWithZod({
    element: <SelectField name="x" />,
    schema: z.object({ x: z.enum(['ă', 'ś']) }),
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));

  expect(listbox.getByText('ă')).toBeInTheDocument();
  expect(listbox.getByText('ś')).toBeInTheDocument();
});

test('<SelectField> - disabled items (options)', () => {
  renderWithZod({
    element: (
      <SelectField
        name="x"
        options={[
          { label: 'A', value: 'a', disabled: true },
          { label: 'B', value: 'b', disabled: false },
        ]}
      />
    ),
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  fireEvent.mouseDown(screen.getByRole('button'));
  const listbox = within(screen.getByRole('listbox'));

  expect(listbox.getByText('A')).toHaveClass('Mui-disabled');
  expect(listbox.getByText('B')).not.toHaveClass('Mui-disabled');
});

test('<SelectField> - renders with correct classnames', () => {
  const { container } = renderWithZod({
    element: (
      <SelectField name="x" textFieldProps={{ className: 'select-class' }} />
    ),
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(container.getElementsByClassName('select-class').length).toBe(1);
});

test('<SelectField checkboxes> - renders a set of Radio buttons', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByRole('radiogroup')).toBeInTheDocument();
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct disabled state', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" disabled />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).toBeDisabled();
  expect(screen.getByLabelText('b')).toBeDisabled();
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct id (inherited)', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).toHaveAttribute('id');
  expect(screen.getByLabelText('b')).toHaveAttribute('id');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct id (specified)', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" id="y" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).toHaveAttribute('id', 'y-YQ');
  expect(screen.getByLabelText('b')).toHaveAttribute('id', 'y-Yg');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct name', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).toHaveAttribute('name', 'x');
  expect(screen.getByLabelText('b')).toHaveAttribute('name', 'x');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (default)', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).toBeChecked();
  expect(screen.getByLabelText('b')).not.toBeChecked();
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (model)', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
    model: { x: 'b' },
  });

  expect(screen.getByLabelText('a')).not.toBeChecked();
  expect(screen.getByLabelText('b')).toBeChecked();
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (specified)', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" value="b" />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByLabelText('a')).not.toBeChecked();
  expect(screen.getByLabelText('b')).toBeChecked();
});

test('<SelectField checkboxes> - renders a set of Radio buttons which correctly reacts on change', () => {
  const onChange = jest.fn();

  renderWithZod({
    element: <SelectField checkboxes name="x" onChange={onChange} />,
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  fireEvent.click(screen.getByLabelText('b'));

  expect(onChange).toHaveBeenCalledWith('b');
});

test('<SelectField checkboxes> - renders a set of Checkboxes with correct labels', () => {
  renderWithZod({
    element: <SelectField checkboxes name="x" />,
    schema: z.object({
      x: z.string().uniforms({
        fieldType: Array,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      }),
    }),
  });

  expect(screen.getByLabelText('A')).toBeInTheDocument();
  expect(screen.getByLabelText('B')).toBeInTheDocument();
});

test('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=true)', () => {
  const error = new Error();
  renderWithZod({
    element: (
      <SelectField
        checkboxes
        name="x"
        error={error}
        showInlineError
        errorMessage="Error"
      />
    ),
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.getByText('Error')).toBeInTheDocument();
});

test('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  renderWithZod({
    element: (
      <SelectField
        checkboxes
        name="x"
        error={error}
        showInlineError={false}
        errorMessage="Error"
      />
    ),
    schema: z.object({ x: z.enum(['a', 'b']) }),
  });

  expect(screen.queryByText('Error')).not.toBeInTheDocument();
});

test('<SelectField checkboxes> - renders Checkbox with appearance=checkbox', () => {
  const { container } = renderWithZod({
    element: <SelectField appearance="checkbox" checkboxes name="x" />,
    schema: z.object({
      x: z.string().uniforms({
        fieldType: Array,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      }),
    }),
  });

  expect(container.getElementsByClassName('MuiCheckbox-root').length).toBe(2);
});

test('<SelectField checkboxes> - renders Switch with appearance=switch', () => {
  const { container } = renderWithZod({
    element: <SelectField appearance="switch" checkboxes name="x" />,
    schema: z.object({
      x: z.string().uniforms({
        fieldType: Array,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      }),
    }),
  });

  expect(container.getElementsByClassName('MuiSwitch-root').length).toBe(2);
});

test('<SelectField checkboxes> - disabled items (checkboxes) based on predicate', () => {
  renderWithZod({
    element: (
      <SelectField
        appearance="checkbox"
        checkboxes
        name="x"
        options={[
          { label: 'A', value: 'a', disabled: true },
          { label: 'B', value: 'b', disabled: false },
        ]}
      />
    ),
    schema: z.object({
      x: z.string().array(),
    }),
  });

  expect(screen.getByLabelText('A')).toBeDisabled();
  expect(screen.getByLabelText('B')).not.toBeDisabled();
});
