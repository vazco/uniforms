import { adaptV4Theme, createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/styles/ThemeProvider';
import React from 'react';
import { ErrorField } from 'uniforms-material5';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

const error = {
  error: 'validation-error',
  reason: 'X is required',
  details: [{ name: 'x', type: 'required', details: { value: null } }],
  message: 'X is required [validation-error]',
};

// TODO[theme]
describe.skip('@RTL - ErrorField tests', () => {
  test('<ErrorField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createTheme(
      adaptV4Theme({
        props: {
          MuiFormControl: {
            fullWidth: false,
            margin: 'normal',
            variant: 'filled',
          },
        },
      }),
    );
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

  test('<ErrorField> - default props are passed when MUI theme props are absent', () => {
    const theme = createTheme(adaptV4Theme({}));
    const { container, debug } = render(
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

  test('<ErrorField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createTheme(
      adaptV4Theme({
        props: {
          MuiFormControl: {
            fullWidth: true,
            margin: 'dense',
            variant: 'filled',
          },
        },
      }),
    );
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

test('<ErrorField> - works', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField)).toHaveLength(1);
});

test('<ErrorField> - renders correct error message (context)', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { error }),
  );

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('X is required');
});

test('<ErrorField> - renders correct error message (specified)', () => {
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
