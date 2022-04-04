import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { DateField, DateFieldProps } from 'uniforms-material';
import { render } from 'uniforms/__suites__';

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
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
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
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      true,
    );
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
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
  });
});

test('<DateField> - renders Input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input)).toHaveLength(1);
});

test('<DateField> - renders a Input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('id')).toBeTruthy();
});

test('<DateField> - renders a Input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('id')).toBe('y');
});

test('<DateField> - renders a Input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('name')).toBe('x');
});

test('<DateField> - renders an Input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

test('<DateField> - renders an Input with correct readOnly state', () => {
  const element = <DateField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('inputProps')!.readOnly).toBe(true);
});

test('<DateField> - renders a Input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormLabel).text()).toBe('DateFieldLabel *');
});

test('<DateField> - renders a Input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('value')).toBe('');
});

const cases = ['datetime-local', 'date'] as DateFieldProps['type'][];

test.each(cases)(
  '<DateField> - renders a Input with correct value (model) when type is "%s"',
  (type: DateFieldProps['type']) => {
    const now = new Date();
    const element = <DateField name="x" type={type} />;
    const sliceEnd = type === 'datetime-local' ? -8 : -14;
    const wrapper = mount(
      element,
      createContext({ x: { type: Date } }, { model: { x: now } }),
    );

    expect(wrapper.find(Input).prop('value')).toEqual(
      now.toISOString().slice(0, sliceEnd),
    );
  },
);

test('<DateField> - renders a Input with correct value (specified)', () => {
  const now = new Date();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(Input).prop('value')).toEqual(
    now.toISOString().slice(0, -8),
  );
});

test('<DateField> - renders a Input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(Input).props().onChange!({ target: { valueAsNumber: now } });
  expect(onChange).toHaveBeenLastCalledWith('x', now);
});

test('<DateField> - renders a Input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  wrapper.find(Input).props().onChange!({
    // @ts-expect-error Provide a valid EventTarget.
    target: { valueAsNumber: undefined },
  });
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<DateField> - renders a Input which correctly reacts on change (overflow)', () => {
  const onChange = jest.fn();

  const now = new Date(1e5, 0);
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(Input).props().onChange!({ target: { valueAsNumber: now } });
  expect(onChange).not.toHaveBeenCalled();
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
