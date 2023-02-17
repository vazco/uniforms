import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType, FC } from 'react';

import { render } from './render';

export function testListField(
  ListField: ComponentType<any>,
  {
    addFieldLocator,
  }: { addFieldLocator: () => HTMLElement | null | undefined },
) {
  test('<ListField> - renders ListAddField', () => {
    render(<ListField name="x" label="ListFieldLabel" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<ListField> - renders correct label (specified)', () => {
    render(<ListField name="x" label="ListFieldLabel" />);

    // Throws error with no form control found when getting by label
    expect(screen.getByText(/ListFieldLabel.*/)).toBeInTheDocument();
  });

  test('<ListField> - renders correct numer of items with model (specified)', () => {
    render(
      <ListField name="x" />,
      {
        x: Array,
        'x.$': String,
      },
      undefined,
      { x: [undefined, undefined, undefined] },
    );

    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });

  test('<ListField> - passes itemProps to its children', () => {
    const itemProps = { 'data-xyz': 1 };
    const Child = jest.fn(() => <div />) as FC<any>;
    render(
      <ListField name="x" itemProps={itemProps}>
        <Child />
      </ListField>,
      { x: Array, 'x.$': String },
      undefined,
      { x: [undefined, undefined] },
    );

    expect(Child).toHaveBeenCalledTimes(2);
    expect(Child).toHaveBeenNthCalledWith(1, itemProps, {});
    expect(Child).toHaveBeenNthCalledWith(2, itemProps, {});
  });

  test('<ListField> - renders children (specified)', () => {
    const Child = jest.fn(() => <div />) as FC<any>;
    render(
      <ListField name="x">
        <Child />
        PlainText
      </ListField>,
      { x: Array, 'x.$': String },
      undefined,
      { x: [undefined, undefined] },
    );

    expect(Child).toHaveBeenCalledTimes(2);
  });

  test('<ListField> - renders children with correct name (children)', () => {
    const Child = jest.fn(() => <div data-testid="field" />) as FC<any>;
    render(
      <ListField name="x">
        <Child name="$" />
      </ListField>,
      { x: Array, 'x.$': String },
      undefined,
      { x: [undefined, undefined] },
    );

    expect(Child).toHaveBeenNthCalledWith(1, { name: '0' }, {});
    expect(Child).toHaveBeenNthCalledWith(2, { name: '1' }, {});
  });

  test('<ListField> - renders children with correct name (value)', () => {
    render(
      <ListField name="x" />,
      {
        x: Array,
        'x.$': String,
      },
      undefined,
      { x: [undefined, undefined] },
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('name', 'x.0');
    expect(inputs[1]).toHaveAttribute('name', 'x.1');
  });

  test('<ListField> - renders proper number of optional values after add new value', () => {
    const onChange = jest.fn();
    render(
      <ListField name="x" label="ListFieldLabel" />,
      { x: { type: Array, optional: true }, 'x.$': String },
      { onChange },
    );

    const addField = addFieldLocator();
    expect(addField).toBeTruthy();
    userEvent.click(addField!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('x', [undefined]);
  });
}
