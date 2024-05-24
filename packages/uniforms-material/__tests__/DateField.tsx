import FormHelperText from '@material-ui/core/FormHelperText';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { render } from 'uniforms/__suites__';
import { DateField } from 'uniforms-material';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - DateField tests', () => {
  test('<DateField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DateField name="x" />
      </ThemeProvider>,
      { x: { type: Date } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
  });

  test('<DateField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DateField name="x" />
      </ThemeProvider>,
      { x: { type: Date } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).toHaveClass('MuiFormControl-fullWidth');
  });

  test('<DateField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <DateField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: Date } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
  });
});

test('<DateField> - renders a Input with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <DateField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

test('<DateField> - renders a Input with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <DateField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormHelperText)).toHaveLength(0);
});
