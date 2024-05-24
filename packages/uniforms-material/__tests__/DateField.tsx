import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import { screen } from '@testing-library/react';
import React from 'react';
import { DateField } from 'uniforms-material';
import { renderWithZod } from 'uniforms/__suites__';
import { z } from 'zod';

describe('@RTL - DateField tests', () => {
  test('<DateField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
    });
    const onChange = jest.fn();
    renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <DateField name="x" type="date" />
        </ThemeProvider>
      ),
      onChange,
      schema: z.object({ x: z.date() }),
    });
    const x = screen.getByText('X');
    expect(x.closest('.MuiFormControl-marginNormal')).toBeInTheDocument();
    expect(x.closest('.MuiFormControl-fullWidth')).not.toBeInTheDocument();
  });

  test('<DateField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const onChange = jest.fn();
    renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <DateField name="x" type="date" />
        </ThemeProvider>
      ),
      onChange,
      schema: z.object({ x: z.date() }),
    });
    const x = screen.getByText('X');
    expect(
      x.closest('.MuiFormControl-marginDense.MuiFormControl-fullWidth'),
    ).toBeInTheDocument();
  });

  test('<DateField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
    });
    const onChange = jest.fn();
    renderWithZod({
      element: (
        <ThemeProvider theme={theme}>
          <DateField name="x" fullWidth={false} margin="normal" />
        </ThemeProvider>
      ),
      onChange,
      schema: z.object({ x: z.date() }),
    });
    const x = screen.getByText('X');
    expect(x.closest('.MuiFormControl-marginNormal')).toBeInTheDocument();
    expect(x.closest('.MuiFormControl-fullWidth')).not.toBeInTheDocument();
  });
});

test('<DateField> - renders a Input with correct error text (specified)', () => {
  const error = new Error();
  renderWithZod({
    element: (
      <DateField name="x" error={error} errorMessage="Error" showInlineError />
    ),
    schema: z.object({ x: z.date() }),
  });
  expect(screen.getByText('Error')).toBeInTheDocument();
});

test('<DateField> - renders a Input with correct error text (showInlineError=false)', () => {
  const error = new Error();
  renderWithZod({
    element: (
      <DateField
        name="x"
        error={error}
        errorMessage="Error"
        showInlineError={false}
      />
    ),
    schema: z.object({ x: z.date() }),
  });
  expect(
    screen.getByText('X').nextElementSibling?.classList.contains('Mui-error'),
  ).toBe(true);
});
