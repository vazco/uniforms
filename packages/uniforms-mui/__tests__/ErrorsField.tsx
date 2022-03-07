import FormHelperText from '@mui/material/FormHelperText';
import { adaptV4Theme, createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/styles/ThemeProvider';
import React from 'react';
import { ErrorsField } from 'uniforms-mui';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

const error = {
  error: 'validation-error',
  reason: 'X is required',
  details: [
    { name: 'x', type: 'required', details: { value: null } },
    { name: 'y', type: 'required', details: { value: null } },
    { name: 'z', type: 'required', details: { value: null } },
  ],
  message: 'X is required [validation-error]',
};

describe('@RTL - ErrorsField tests', () => {
  test('<ErrorsField> - default props are not passed when MUI theme props are specified', () => {
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
        <ErrorsField />
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
    ).toHaveLength(3);
  });

  // TODO[theme]
  test.skip('<ErrorsField> - default props are passed when MUI theme props are absent', () => {
    const theme = createTheme(adaptV4Theme({}));
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ErrorsField />
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

  test('<ErrorsField> - explicit props are passed when MUI theme props are specified', () => {
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
        <ErrorsField {...explicitProps} />
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

test('<ErrorsField> - works', () => {
  const element = <ErrorsField />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorsField)).toHaveLength(1);
});

test('<ErrorsField> - renders list of correct error messages (context)', () => {
  const element = <ErrorsField />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String }, y: { type: String }, z: { type: String } },
      { error },
    ),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(3);
  expect(wrapper.find(FormHelperText).at(0).text()).toBe('X is required');
  expect(wrapper.find(FormHelperText).at(1).text()).toBe('Y is required');
  expect(wrapper.find(FormHelperText).at(2).text()).toBe('Z is required');
});

test('<ErrorsField> - renders children (specified)', () => {
  const element = <ErrorsField children="Error message list" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String }, y: { type: String }, z: { type: String } },
      { error },
    ),
  );

  expect(wrapper.find(ErrorsField).text()).toEqual(
    expect.stringContaining('Error message list'),
  );
});
