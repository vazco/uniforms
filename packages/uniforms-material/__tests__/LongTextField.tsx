import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { LongTextField } from 'uniforms-material';
import { renderWithZod } from 'uniforms/__suites__';
import z from 'zod';

describe('@RTL - LongTextField tests', () => {
  test('<LongTextField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
    });

    const { container } = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
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
    const theme = createMuiTheme({});

    const { container } = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
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
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
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
});
