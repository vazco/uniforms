import { adaptV4Theme, createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/styles/ThemeProvider';
import React from 'react';
import { SubmitField } from 'uniforms-material5';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - SubmitField tests', () => {
  test('<SubmitField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createTheme(
      adaptV4Theme({
        props: { MuiButton: { variant: 'outlined' } },
      }),
    );
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SubmitField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
    );

    const elements = container.getElementsByClassName('MuiButton-outlined');
    expect(elements).toHaveLength(1);
  });

  test('<SubmitField> - default props are passed when MUI theme props are absent', () => {
    const theme = createTheme(adaptV4Theme({}));
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SubmitField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
    );

    const elements = container.getElementsByClassName('MuiButton-contained');
    expect(elements).toHaveLength(1);
  });

  test('<SubmitField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createTheme(
      adaptV4Theme({
        props: { MuiButton: { variant: 'outlined' } },
      }),
    );
    const explicitProps = {
      variant: 'text' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <SubmitField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: String } },
    );

    const elements = container.getElementsByClassName('MuiButton-text');
    expect(elements).toHaveLength(1);
  });
});

test('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

test('<SubmitField> - renders SubmitField with correct disabled state', () => {
  const element = <SubmitField disabled />;
  const wrapper = mount(element, createContext());

  expect(wrapper.children().first().prop('disabled')).toBe(true);
});

test('<SubmitField> - renders SubmitField with correct disabled state when error (context)', () => {
  const error = new Error();
  const element = <SubmitField />;
  const wrapper = mount(element, createContext({}, { error }));

  expect(wrapper.children().first().prop('disabled')).toBe(true);
});
