import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { ErrorsField } from 'uniforms-material';
import { renderWithZod } from 'uniforms/__suites__';
import z from 'zod';

describe('@RTL - ErrorsField tests', () => {
  test('<ErrorsField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: {
        MuiFormControl: {
          fullWidth: false,
          margin: 'normal',
          variant: 'filled',
        },
      },
    });

    const screen = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <ErrorsField />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['y'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['z'] },
      ]),
      schema: z.object({ x: z.string() }),
    });

    const elements = screen.container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
    expect(
      screen.container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(3);
  });

  test('<ErrorsField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const screen = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <ErrorsField />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['y'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['z'] },
      ]),
      schema: z.object({ x: z.string() }),
    });

    const elements = screen.container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).toHaveClass('MuiFormControl-fullWidth');
    expect(
      screen.container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(0);
  });

  test('<ErrorsField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: {
        MuiFormControl: { fullWidth: true, margin: 'dense', variant: 'filled' },
      },
    });

    const screen = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <ErrorsField fullWidth={false} margin="normal" variant="standard" />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['y'] },
        { code: z.ZodIssueCode.custom, message: '', path: ['z'] },
      ]),
      schema: z.object({ x: z.string() }),
    });

    const elements = screen.container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
    expect(
      screen.container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(0);
  });
});
