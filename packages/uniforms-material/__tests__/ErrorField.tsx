import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { renderWithZod } from 'uniforms/__suites__';
import { ErrorField } from 'uniforms-material';
import z from 'zod';

describe('@RTL - ErrorField tests', () => {
  test('<ErrorField> - default props are not passed when MUI theme props are specified', () => {
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
          <ErrorField name="x" />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
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
    ).toHaveLength(1);
  });

  test('<ErrorField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const screen = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <ErrorField name="x" />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
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

  test('<ErrorField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: {
        MuiFormControl: { fullWidth: true, margin: 'dense', variant: 'filled' },
      },
    });

    const screen = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <ErrorField
            fullWidth={false}
            margin="normal"
            name="x"
            variant="standard"
          />
        </ThemeProvider>
      ),
      error: z.ZodError.create([
        { code: z.ZodIssueCode.custom, message: '', path: ['x'] },
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
