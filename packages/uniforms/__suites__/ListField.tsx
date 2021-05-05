import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import createContext, { render } from './renderWithContext';

function getDefaultContext() {
  return createContext({ x: { type: Array }, 'x.$': { type: String } });
}

export function ListFieldTests(ListField: React.FC<any>) {
  test('<ListField> - renders ListAddField', () => {
    render(<ListField name="x" label="ListFieldLabel" />, getDefaultContext());

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<ListField> - renders correct label (specified)', () => {
    render(<ListField name="x" label="ListFieldLabel" />, getDefaultContext());

    // Throws error with no form control found when getting by label
    expect(screen.getByText(/ListFieldLabel.*/)).toBeInTheDocument();
  });

  test('<ListField> - renders correct numer of items with initialCount (specified)', () => {
    render(<ListField name="x" initialCount={3} />, getDefaultContext());

    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });

  test('<ListField> - passes itemProps to its children', () => {
    const itemProps = { 'data-xyz': 1 };
    const Child = jest.fn(() => <div />) as React.FC<any>;
    render(
      <ListField name="x" initialCount={2} itemProps={itemProps}>
        <Child />
      </ListField>,
      getDefaultContext(),
    );

    expect(Child).toHaveBeenCalledTimes(2);
    expect(Child).toHaveBeenNthCalledWith(1, itemProps, {});
    expect(Child).toHaveBeenNthCalledWith(2, itemProps, {});
  });

  test('<ListField> - renders children (specified)', () => {
    const Child = jest.fn(() => <div />) as React.FC<any>;
    const element = (
      <ListField name="x" initialCount={2}>
        <Child />
        PlainText
      </ListField>
    );
    render(element, getDefaultContext());

    expect(Child).toHaveBeenCalledTimes(2);
  });

  test('<ListField> - renders children with correct name (children)', () => {
    const Child = jest.fn(() => <div data-testid="field" />) as React.FC<any>;
    const element = (
      <ListField name="x" initialCount={2}>
        <Child name="$" />
      </ListField>
    );
    render(element, getDefaultContext());

    expect(Child).toHaveBeenNthCalledWith(1, { name: '0' }, {});
    expect(Child).toHaveBeenNthCalledWith(2, { name: '1' }, {});
  });

  test('<ListField> - renders children with correct name (value)', () => {
    const element = <ListField name="x" initialCount={2} />;
    render(element, getDefaultContext());

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('name', 'x.0');
    expect(inputs[1]).toHaveAttribute('name', 'x.1');
  });

  test('<ListField> - renders proper number of optional values after add new value (with initialCount)', () => {
    const onChange = jest.fn();
    render(
      <ListField name="x" initialCount={3} label="ListFieldLabel" />,
      createContext(
        { x: { type: Array, optional: true }, 'x.$': { type: String } },
        { onChange },
      ),
    );

    // Due to differences in how and where the add button is rendered,
    // we have to use different queries for different themes
    const addButton =
      screen.queryByText(/\+/) ??
      screen.queryAllByRole('img').pop() ??
      screen.getAllByRole('button')[0];
    userEvent.click(addButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('x', [
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });
}
