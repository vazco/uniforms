import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

// eslint-disable-next-line complexity
export function testBoolField(
  BoolField: ComponentType<any>,
  options?: {
    testSwitch?: boolean;
    isButton?: boolean;
  },
) {
  test('<BoolField> - renders an input', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toHaveAttribute('name', 'x');
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toHaveAttribute('name', 'x');
    });
  }

  test('<BoolField> - renders an input with correct id (inherited)', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toBeTruthy();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct id (inherited)', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toBeTruthy();
    });
  }

  test('<BoolField> - renders an input with correct id (specified)', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" id="y" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toHaveAttribute('id', 'y');
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct id (specified)', () => {
      renderWithZod({
        element: (
          <BoolField
            name="x"
            data-testid="boolfield"
            id="y"
            appearance="switch"
          />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toHaveAttribute('id', 'y');
    });
  }

  test('<BoolField> - renders an input with correct name', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toHaveAttribute('name', 'x');
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct name', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toHaveAttribute('name', 'x');
    });
  }

  test('<BoolField> - renders an input with correct type', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toHaveAttribute(
      'type',
      options?.isButton ? 'button' : 'checkbox',
    );
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct type', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toHaveAttribute('type', 'checkbox');
    });
  }

  test('<BoolField> - renders an input with correct disabled state', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" disabled />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toBeDisabled();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct disabled state', () => {
      renderWithZod({
        element: (
          <BoolField
            name="x"
            data-testid="boolfield"
            disabled
            appearance="switch"
          />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toBeDisabled();
    });
  }

  test('<BoolField> - renders an input with correct readOnly state', async () => {
    const onChange = jest.fn();

    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" readOnly />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : (screen.getByTestId('boolfield').querySelector('input') as
          | HTMLInputElement
          | HTMLButtonElement);

    await userEvent.click(element);

    expect(onChange).not.toHaveBeenCalled();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct readOnly state', async () => {
      const onChange = jest.fn();

      renderWithZod({
        element: (
          <BoolField
            name="x"
            data-testid="boolfield"
            readOnly
            appearance="switch"
          />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : (screen.getByTestId('boolfield').querySelector('input') as
            | HTMLInputElement
            | HTMLButtonElement);

      await userEvent.click(element);

      expect(onChange).not.toHaveBeenCalled();
    });
  }

  test('<BoolField> - renders an input with correct label (specified)', () => {
    renderWithZod({
      element: (
        <BoolField name="x" data-testid="boolfield" label="BoolFieldLabel" />
      ),
      schema: z.object({ x: z.boolean() }),
    });

    expect(screen.getByText(/BoolFieldLabel.*/)).toBeInTheDocument();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct label (specified)', () => {
      renderWithZod({
        element: (
          <BoolField
            name="x"
            data-testid="boolfield"
            label="BoolFieldLabel"
            appearance="switch"
          />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      expect(screen.getByText(/BoolFieldLabel.*/)).toBeInTheDocument();
    });
  }

  test('<BoolField> - renders an input with correct value (default)', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).not.toBeChecked();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct value (default)', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).not.toBeChecked();
    });
  }

  test('<BoolField> - renders an input with correct value (model)', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      model: { x: true },
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toBeChecked();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct value (model)', () => {
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        model: { x: true },
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toBeChecked();
    });
  }

  test('<BoolField> - renders an input with correct value (specified)', () => {
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" value />,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : screen.getByTestId('boolfield').querySelector('input');

    expect(element).toBeChecked();
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch with correct value (specified)', () => {
      renderWithZod({
        element: (
          <BoolField
            name="x"
            data-testid="boolfield"
            value
            appearance="switch"
          />
        ),
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : screen.getByTestId('boolfield').querySelector('input');

      expect(element).toBeChecked();
    });
  }

  test('<BoolField> - renders an input which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <BoolField name="x" data-testid="boolfield" />,
      onChange,
      schema: z.object({ x: z.boolean() }),
    });

    const element = options?.isButton
      ? screen.getByTestId('boolfield')
      : (screen.getByTestId('boolfield').querySelector('input') as
          | HTMLInputElement
          | HTMLButtonElement);

    await userEvent.click(element);

    expect(onChange).toHaveBeenLastCalledWith('x', true);
  });

  if (options?.testSwitch) {
    test('<BoolField> - renders a switch which correctly reacts on change', async () => {
      const onChange = jest.fn();
      renderWithZod({
        element: (
          <BoolField name="x" data-testid="boolfield" appearance="switch" />
        ),
        onChange,
        schema: z.object({ x: z.boolean() }),
      });

      const element = options?.isButton
        ? screen.getByTestId('boolfield')
        : (screen.getByTestId('boolfield').querySelector('input') as
            | HTMLInputElement
            | HTMLButtonElement);

      await userEvent.click(element);

      expect(onChange).toHaveBeenLastCalledWith('x', true);
    });
  }

  test('<BoolField> - renders a wrapper with unknown props', () => {
    renderWithZod({
      element: (
        <BoolField
          name="x"
          data-testid="boolfield"
          data-x="x"
          data-y="y"
          data-z="z"
        />
      ),
      schema: z.object({ x: z.boolean() }),
    });

    const field = screen.getByTestId('boolfield');
    expect(field).toHaveAttribute('data-x', 'x');
    expect(field).toHaveAttribute('data-y', 'y');
    expect(field).toHaveAttribute('data-z', 'z');
  });
}
