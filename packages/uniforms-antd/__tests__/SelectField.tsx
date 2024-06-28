import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { SelectField } from 'uniforms-antd';
import { renderWithZod } from 'uniforms/__suites__';
import { z } from 'zod';

test('<SelectField> - renders a select which correctly reacts on change (array)', () => {
  const onChange = jest.fn();

  renderWithZod({
    element: <SelectField name="x" />,
    schema: z.object({
      x: z.string().uniforms({
        fieldType: Array,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      }),
    }),
    onChange,
  });

  fireEvent.mouseDown(screen.getByRole('combobox'));
  fireEvent.click(screen.getByText('B'));

  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField> - renders a select (undefined values)', () => {
  const { container } = renderWithZod({
    element: <SelectField name="x" value={[undefined, 'a', undefined]} />,
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

  expect(
    container.getElementsByClassName('ant-select-selection-item-content')
      .length,
  ).toBe(1);
});
