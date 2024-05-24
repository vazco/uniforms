import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { render } from 'uniforms/__suites__';
import { NestField } from 'uniforms-material';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - NestField tests', () => {
  test('<NestField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiFormControl: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <NestField name="x" />
      </ThemeProvider>,
      { x: { type: Object }, 'x.a': { type: String } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
  });

  test('<NestField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <NestField name="x" />
      </ThemeProvider>,
      { x: { type: Object }, 'x.a': { type: String } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(2); // Nested TextField is found as well
    expect(elements[0]).toHaveClass('MuiFormControl-fullWidth');
  });

  test('<NestField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiFormControl: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <NestField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: Object }, 'x.a': { type: String } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0]).not.toHaveClass('MuiFormControl-fullWidth');
  });
});

test('<NestField> - renders a Subheader', () => {
  const element = <NestField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(FormLabel).at(0).text()).toBe('y *');
});

test('<NestField> - renders a helperText', () => {
  const element = <NestField name="x" helperText="Helper" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(1);
  expect(wrapper.find(FormHelperText).text()).toBe('Helper');
});
