import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { ErrorField } from 'uniforms-material';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

const error = {
  error: 'validation-error',
  reason: 'X is required',
  details: [{ name: 'x', type: 'required', details: { value: null } }],
  message: 'X is required [validation-error]',
};

describe('@RTL - ErrorField tests', () => {
  it('<ErrorField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: {
        MuiFormControl: {
          fullWidth: false,
          margin: 'normal',
          variant: 'filled',
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ErrorField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
      { error },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
    expect(
      container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(1);
  });

  it('<ErrorField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ErrorField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
      { error },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      true,
    );
    expect(
      container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(0);
  });

  it('<ErrorField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: {
        MuiFormControl: { fullWidth: true, margin: 'dense', variant: 'filled' },
      },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
      variant: 'standard' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <ErrorField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: String } },
      { error },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
    expect(
      container.getElementsByClassName('MuiFormHelperText-contained'),
    ).toHaveLength(0);
  });
});

it('<ErrorField> - works', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField)).toHaveLength(1);
});

it('<ErrorField> - renders correct error message (context)', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { error }),
  );

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('X is required');
});

it('<ErrorField> - renders correct error message (specified)', () => {
  const element = (
    <ErrorField
      name="x"
      error={error.details[0]}
      errorMessage="X is required"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('X is required');
});
