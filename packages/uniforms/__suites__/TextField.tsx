import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentType, PropsWithChildren } from 'react';
import z from 'zod';

import { renderWithZod } from './render-zod';

type TestTextFieldOptions = {
  testShowInlineError?: boolean;
  testPassThemeProps?: {
    ThemeProvider: (
      props: PropsWithChildren<{ themeOptions: any }>,
    ) => JSX.Element;
  };
  testWrapClassName?: boolean;
  testRenderIcon?: boolean;
  testMinMaxLength?: boolean;
};

export function testTextField(
  TextField: ComponentType<any>,
  options: TestTextFieldOptions = {
    testShowInlineError: true,
  },
) {
  test('<TextField> - renders an input', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  test('<TextField> - renders an input with correct disabled state', () => {
    renderWithZod({
      element: <TextField name="x" disabled />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('<TextField> - renders an input with correct readOnly state', () => {
    renderWithZod({
      element: <TextField name="x" readOnly />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  test('<TextField> - renders an input with autocomplete turned off', () => {
    renderWithZod({
      element: <TextField name="x" autoComplete="off" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  test('<TextField> - renders an input with correct id (inherited)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id');
  });

  test('<TextField> - renders an input with correct id (specified)', () => {
    renderWithZod({
      element: <TextField name="x" id="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'y');
  });

  test('<TextField> - renders an input with correct name', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'x');
  });

  test('<TextField> - renders an input with correct placeholder', () => {
    renderWithZod({
      element: <TextField name="x" placeholder="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'y');
  });

  test('<TextField> - renders an input with correct type', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  test('<TextField> - renders an input with correct type (url)', () => {
    renderWithZod({
      element: <TextField name="x" type="url" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  test('<TextField> - renders an input with correct value (default)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('<TextField> - renders an input with correct value (model)', () => {
    renderWithZod({
      element: <TextField name="x" />,
      model: { x: 'y' },
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<TextField> - renders an input with correct value (specified)', () => {
    renderWithZod({
      element: <TextField name="x" value="y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByRole('textbox')).toHaveValue('y');
  });

  test('<TextField> - renders an input which correctly reacts on change', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <TextField name="x" />,
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), 'y');
    expect(onChange).toHaveBeenLastCalledWith('x', 'y');
  });

  test('<TextField> - renders an input which correctly reacts on change (empty value)', async () => {
    const onChange = jest.fn();
    renderWithZod({
      element: <TextField name="x" />,
      model: { x: 'y' },
      onChange,
      schema: z.object({ x: z.string() }),
    });
    await userEvent.type(screen.getByRole('textbox'), '{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith('x', '');
  });

  test('<TextField> - renders a label', () => {
    renderWithZod({
      element: <TextField name="x" label="Y" />,
      schema: z.object({ x: z.string() }),
    });
    expect(screen.getByLabelText(/^Y/)).toBeInTheDocument();
  });

  test('<TextField> - renders a wrapper with unknown props', () => {
    const props = {
      'data-x': 'x',
      'data-y': 'y',
      'data-z': 'z',
    };
    renderWithZod({
      element: <TextField name="x" {...props} />,
      schema: z.object({ x: z.string() }),
    });

    const querySelectorParams = Object.entries(props)
      .map(([key, value]) => `[${key}="${value}"]`)
      .join('');
    const wrapper = screen.getByRole('textbox').closest(querySelectorParams);
    expect(wrapper).toBeTruthy();
  });

  test('<TextField> - renders a input with correct type prop (password)', () => {
    renderWithZod({
      element: <TextField name="x" type="password" />,
      schema: z.object({ x: z.string() }),
    });
    const wrapper = screen.getByLabelText(/^X( \*)?$/);
    expect(wrapper).toHaveAttribute('type', 'password');
  });

  if (options.testShowInlineError) {
    test('<TextField> - renders a TextField with correct error text (specified)', () => {
      const errorMessage = 'Error';
      renderWithZod({
        element: (
          <TextField
            error={new Error()}
            name="x"
            showInlineError
            errorMessage={errorMessage}
          />
        ),
        schema: z.object({ x: z.string() }),
      });

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
      const errorMessage = 'Error';
      renderWithZod({
        element: (
          <TextField
            error={new Error()}
            name="x"
            showInlineError={false}
            errorMessage={errorMessage}
          />
        ),
        schema: z.object({ x: z.string() }),
      });

      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    });
  }

  if (options.testPassThemeProps) {
    const { ThemeProvider } = options.testPassThemeProps;

    test('<TextField> - default props are not passed when MUI theme props are specified', () => {
      const themeOptions = {
        props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
      };
      const { container } = renderWithZod({
        element: (
          <ThemeProvider themeOptions={themeOptions}>
            <TextField name="x" />
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

    test('<TextField> - default props are passed when MUI theme props are absent', () => {
      const themeOptions = {};
      const { container } = renderWithZod({
        element: (
          <ThemeProvider themeOptions={themeOptions}>
            <TextField name="x" />
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

    test('<TextField> - explicit props are passed when MUI theme props are specified', () => {
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
            <TextField name="x" {...explicitProps} />
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

  if (options.testRenderIcon) {
    test('<TextField> - renders an icon', () => {
      const { container } = renderWithZod({
        element: <TextField name="x" icon="small home" />,
        schema: z.object({ x: z.string() }),
      });

      expect(container.querySelector('i')).toBeInTheDocument();
    });
  }

  if (options.testWrapClassName) {
    test('<TextField> - renders with a custom wrapClassName', () => {
      const testClassName = 'test-class-name';
      renderWithZod({
        element: <TextField name="x" wrapClassName={testClassName} />,
        schema: z.object({ x: z.string() }),
      });

      expect(screen.getByRole('textbox').closest('div')).toHaveClass(
        testClassName,
      );
    });
  }

  if (options.testMinMaxLength) {
    test('<TextField> - renders a input with minLength and maxLength', () => {
      renderWithZod({
        element: <TextField name="x" minLength={1} maxLength={10} />,
        schema: z.object({ x: z.string() }),
      });

      const inputElement = screen.getByRole('textbox');
      const wrapperElement = inputElement.parentNode;

      expect(inputElement).toHaveAttribute('minLength', '1');
      expect(inputElement).toHaveAttribute('maxLength', '10');
      expect(wrapperElement).not.toHaveAttribute('minLength');
      expect(wrapperElement).not.toHaveAttribute('maxLength');
    });
  }
}
