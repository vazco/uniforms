import TextField from '@material-ui/core/TextField';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { LongTextField } from 'uniforms-material';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - LongTextField tests', () => {
  test('<LongTextField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LongTextField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
  });

  test('<LongTextField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LongTextField name="x" />
      </ThemeProvider>,
      { x: { type: String } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      true,
    );
  });

  test('<LongTextField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <LongTextField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: String } },
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

test('<LongTextField> - renders a TextField', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
});

test('<LongTextField> - renders a TextField with correct disabled state', () => {
  const element = <LongTextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('disabled')).toBe(true);
});

test('<LongTextField> - renders a TextField with correct readOnly state', () => {
  const element = <LongTextField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('inputProps')!.readOnly).toBe(true);
});

test('<LongTextField> - renders a TextField with correct id (inherited)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBeTruthy();
});

test('<LongTextField> - renders a TextField with correct id (specified)', () => {
  const element = <LongTextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct name', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('name')).toBe('x');
});

test('<LongTextField> - renders a TextField with correct placeholder', () => {
  const element = <LongTextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('placeholder')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct value (default)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('');
});

test('<LongTextField> - renders a TextField with correct value (model)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct value (specified)', () => {
  const element = <LongTextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('y');
});

test('<LongTextField> - renders a TextField which correctly reacts on change', () => {
  const onChange = vi.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a TextField which correctly reacts on change (empty)', () => {
  const onChange = vi.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: '' } });
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<LongTextField> - renders a TextField which correctly reacts on change (same value)', () => {
  const onChange = vi.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a label', () => {
  const element = <LongTextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('label')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <LongTextField
      name="x"
      error={error}
      showInlineError
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('helperText')).toBe('Error');
});

test('<LongTextField> - renders a TextField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <LongTextField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('helperText')).toBeUndefined();
});
