import { Screen, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType, FC } from 'react';

import { render } from './render';

export function testListField(
  ListField: ComponentType<any>,
  {
    getListAddField,
    disableInlineError,
    testError = true,
    testStyle,
    testTooltip,
  }: {
    getListAddField: (screen: Screen) => HTMLElement;
    disableInlineError?: boolean;
    testError?: boolean;
    testStyle?: boolean;
    testTooltip?: boolean;
  },
) {
  test('<ListField> - renders ListAddField', () => {
    render(<ListField name="x" label="ListFieldLabel" />, {
      x: Array,
      'x.$': String,
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('<ListField> - renders correct label (specified)', () => {
    render(<ListField name="x" label="ListFieldLabel" />, {
      x: Array,
      'x.$': String,
    });

    // Throws error with no form control found when getting by label
    expect(screen.getByText(/ListFieldLabel.*/)).toBeInTheDocument();
  });

  if (testStyle) {
    test('<ListField> - renders correct error style', () => {
      const error = new Error();

      render(
        <ListField
          name="x"
          label="ListFieldLabel"
          error={error}
          data-testid="field"
        />,
        {
          x: Array,
          'x.$': String,
        },
      );

      expect(screen.getByTestId('field')).toHaveStyle(
        'borderColor: rgb(255, 85, 0)',
      );
    });

    test('<ListField> - renders correct error style (with specified style prop)', () => {
      const error = new Error();

      render(
        <ListField
          name="x"
          label="ListFieldLabel"
          error={error}
          style={{ marginLeft: '8px' }}
          data-testid="field"
        />,
        {
          x: Array,
          'x.$': String,
        },
      );

      expect(screen.getByTestId('field')).toHaveStyle('marginLeft: 8px');
    });
  }

  if (testTooltip) {
    test('<ListField> - renders correct info (specified)', () => {
      const { container } = render(
        <ListField name="x" label="ListFieldLabel" info="ListFieldInfo" />,
        {
          x: Array,
          'x.$': String,
        },
      );

      expect(
        container.getElementsByClassName('anticon-question-circle').length,
      ).toBe(1);
    });
  }

  test('<ListField> - renders correct number of items with model (specified)', () => {
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

  // FIXME: React 19
  test.skip('<ListField> - passes itemProps to its children', () => {
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

  // FIXME: React 19
  test.skip('<ListField> - renders children with correct name (children)', () => {
    const Child = jest.fn(() => <div />) as FC<any>;
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

  test('<ListField> - renders proper number of optional values after add new value', async () => {
    const onChange = jest.fn();
    render(
      <ListField name="x" label="ListFieldLabel" />,
      {
        x: { type: Array, optional: true },
        'x.$': { type: Object },
        'x.$.name': { type: String, defaultValue: 'someValue' },
      },
      { onChange },
    );

    await userEvent.click(getListAddField(screen));
    expect(await screen.findAllByDisplayValue('someValue')).toHaveLength(1);
    expect(onChange).toHaveBeenLastCalledWith('x.0', { name: 'someValue' });
  });

  if (testError) {
    test('<ListField> - renders correct error text (specified)', async () => {
      const error = new Error();

      render(
        <ListField
          name="x"
          error={error}
          errorMessage="Error"
          showInlineError
        />,
        {
          x: Array,
          'x.$': String,
        },
      );

      expect(screen.getByText(/^Error$/)).toBeInTheDocument();
    });
  }

  if (disableInlineError) {
    test('<ListField> - renders correct error text (showInlineError=false)', async () => {
      const error = new Error();

      render(
        <ListField
          name="x"
          error={error}
          errorMessage="Error"
          showInlineError={false}
        />,
        {
          x: Array,
          'x.$': String,
        },
      );

      expect(screen.queryByText(/^Error$/)).not.toBeInTheDocument();
    });
  }
}
