import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { RadioField } from 'uniforms-material';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - RadioField tests', () => {
  test('<RadioField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiFormControl: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <RadioField name="x" />
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

  test('<RadioField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <RadioField name="x" />
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

  test('<RadioField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiFormControl: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <RadioField name="x" {...explicitProps} />
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

test('<RadioField> - renders a set of Radio buttons', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
});

test('<RadioField> - renders a set of Radio buttons wrapped with RadioGroup', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).find(Radio)).toHaveLength(2);
});

test('<RadioField> - renders a set of Radio buttons with correct disabled state', () => {
  const element = <RadioField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

test('<RadioField> - renders a RadioGroup with correct id (inherited)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('id')).toBeTruthy();
});

test('<RadioField> - renders a RadioGroup with correct id (specified)', () => {
  const element = <RadioField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('id')).toBe('y');
});

test('<RadioField> - renders a RadioGroup with correct name', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('name')).toBe('x');
});

test('<RadioField> - renders a set of Radio buttons with correct options', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('label')).toBe('a');
  expect(wrapper.find(FormControlLabel).at(1).prop('label')).toBe('b');
});

test('<RadioField> - renders a set of Radio buttons with correct options (transform)', () => {
  const element = (
    <RadioField
      name="x"
      options={[
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ]}
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('label')).toBe('A');
  expect(wrapper.find(FormControlLabel).at(1).prop('label')).toBe('B');
});

test('<RadioField> - renders a RadioGroup with correct value (default)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('value')).toBeFalsy();
});

test('<RadioField> - renders a RadioGroup with correct value (model)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('value')).toBe('b');
});

test('<RadioField> - renders a RadioGroup with correct value (specified)', () => {
  const element = <RadioField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  expect(wrapper.find(RadioGroup).prop('value')).toBe('b');
});

test('<RadioField> - renders a RadioGroup which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  // @ts-expect-error Provide a valid value.
  wrapper.find(RadioGroup).props().onChange!({ target: { value: 'b' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<RadioField> - renders a RadioGroup which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find(RadioGroup)).toHaveLength(1);
  // @ts-expect-error Provide a valid value.
  wrapper.find(RadioGroup).props().onChange!({ target: { value: 'a' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<RadioField> - renders a label', () => {
  const element = <RadioField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormLabel)).toHaveLength(1);
  expect(wrapper.find(FormLabel).text()).toBe('y *');
});

test('<RadioField> - renders a helperText', () => {
  const element = <RadioField name="x" helperText="Helper" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(1);
  expect(wrapper.find(FormHelperText).text()).toBe('Helper');
});

test('<RadioField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <RadioField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

test('<RadioField> - works with special characters', () => {
  mount(
    <RadioField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});
