import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType, PropsWithChildren } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

export function testLongTextField(
  LongTextField: ComponentType<any>,
  options?: {
    skipShowInlineErrorTests?: boolean;
    testMinMaxLength?: boolean;
    testPassThemeProps?: {
      ThemeProvider: (
        props: PropsWithChildren<{ themeOptions: any }>,
      ) => JSX.Element;
    };
  },
) {
  test('<LongTextField> - renders a textarea with correct disabled state', () => {
    renderWithZod({
      element: <LongTextField name="x" disabled />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('<LongTextField> - renders a textarea with correct readOnly state', () => {
    renderWithZod({
      element: <LongTextField name="x" readOnly />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  test('<LongTextField> - renders a textarea with correct id (inherited)', () => {
    renderWithZod({
      element: <LongTextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id');
  });

  test('<LongTextField> - renders a textarea with correct id (specified)', () => {
    renderWithZod({
      element: <LongTextField name="x" id="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'y');
  });

  test('<LongTextField> - renders a textarea with correct name', () => {
    renderWithZod({
      element: <LongTextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'x');
  });

  test('<LongTextField> - renders a textarea with correct placeholder', () => {
    renderWithZod({
      element: <LongTextField name="x" placeholder="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'y');
  });

  test('<LongTextField> - renders a textarea with correct value (default)', () => {
    renderWithZod({
      element: <LongTextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('<LongTextField> - renders a textarea with correct value (model)', () => {
    renderWithZod({
      element: <LongTextField name="x" />,
      model: { x: 'y' },
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<LongTextField> - renders a textarea with correct value (specified)', () => {
    renderWithZod({
      element: <LongTextField name="x" value="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<LongTextField> - renders a textarea which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <LongTextField name="x" />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), 'y');
    expect(onChange).toHaveBeenLastCalledWith('x', 'y');
  });

  test('<LongTextField> - renders a textarea which correctly reacts on change (empty)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <LongTextField name="x" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), '{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith('x', '');
  });

  test('<LongTextField> - renders a label', () => {
    renderWithZod({
      element: <LongTextField name="x" label="Y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByLabelText(/^Y/)).toBeInTheDocument();
  });

  if (!options?.skipShowInlineErrorTests) {
    test('<LongTextField> - renders a helperText', () => {
      renderWithZod({
        element: (
          <LongTextField
            name="x"
            error={new Error()}
            showInlineError
            errorMessage="Error"
          />
        ),
        model: { x: 'y' },
        schema: z.object({ x: z.string() }),
      });

      expect(screen.getByText(/^Error$/)).toBeInTheDocument();
    });
  }

  if (options?.testPassThemeProps) {
    const { ThemeProvider } = options.testPassThemeProps;

    test('<LongTextField> - default props are not passed when MUI theme props are specified', () => {
      const themeOptions = {
        props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
      };
      const { container } = renderWithZod({
        element: (
          <ThemeProvider themeOptions={themeOptions}>
            <LongTextField name="x" />
          </ThemeProvider>
        ),
        schema: z.object({ x: z.string() }),
      });

      const elements = container.getElementsByClassName(
        'MuiFormControl-marginNormal',
      );
      expect(elements).toHaveLength(1);
      expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
    });

    test('<LongTextField> - default props are passed when MUI theme props are absent', () => {
      const themeOptions = {};
      const { container } = renderWithZod({
        element: (
          <ThemeProvider themeOptions={themeOptions}>
            <LongTextField name="x" />
          </ThemeProvider>
        ),
        schema: z.object({ x: z.string() }),
      });

      const elements = container.getElementsByClassName(
        'MuiFormControl-marginDense',
      );
      expect(elements).toHaveLength(1);
      expect(elements[0]).toHaveClass('MuiFormControl-fullWidth');
    });

    test('<LongTextField> - explicit props are passed when MUI theme props are specified', () => {
      const themeOptions = {
        props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
      };
      const explicitProps = {
        fullWidth: false,
        margin: 'normal' as const,
      };

      const { container } = renderWithZod({
        element: (
          <ThemeProvider themeOptions={themeOptions}>
            <LongTextField name="x" {...explicitProps} />
          </ThemeProvider>
        ),
        schema: z.object({ x: z.string() }),
      });

      const elements = container.getElementsByClassName(
        'MuiFormControl-marginNormal',
      );
      expect(elements).toHaveLength(1);
      expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
    });
  }

  if (options?.testMinMaxLength) {
    test('<LongTextField> - renders a textarea with minLength and maxLength', () => {
      renderWithZod({
        element: <LongTextField name="x" minLength={1} maxLength={10} />,
        schema: z.object({ x: z.string() }),
      });

      const element = screen.getByRole('textbox');
      expect(element).toHaveAttribute('minlength', '1');
      expect(element).toHaveAttribute('maxlength', '10');
    });
  }
}
