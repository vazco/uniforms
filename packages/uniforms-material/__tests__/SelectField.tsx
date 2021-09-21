import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider/ThemeProvider';
import React from 'react';
import { SelectField } from 'uniforms-material';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - SelectField tests', () => {
  test('<SelectField> - default props are not passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SelectField name="x" />
      </ThemeProvider>,
      { x: { type: String, allowedValues: ['a', 'b'] } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
  });

  test('<SelectField> - default props are passed when MUI theme props are absent', () => {
    const theme = createMuiTheme({});
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SelectField name="x" />
      </ThemeProvider>,
      { x: { type: String, allowedValues: ['a', 'b'] } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginDense',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      true,
    );
  });

  test('<SelectField> - explicit props are passed when MUI theme props are specified', () => {
    const theme = createMuiTheme({
      props: { MuiTextField: { fullWidth: true, margin: 'dense' } },
    });
    const explicitProps = {
      fullWidth: false,
      margin: 'normal' as const,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        {/* @ts-expect-error */}
        <SelectField name="x" {...explicitProps} />
      </ThemeProvider>,
      { x: { type: String, allowedValues: ['a', 'b'] } },
    );

    const elements = container.getElementsByClassName(
      'MuiFormControl-marginNormal',
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].classList.contains('MuiFormControl-fullWidth')).toBe(
      false,
    );
  });

  test('<SelectField checkboxes> -  MUI theme props are passed', () => {
    const theme = createMuiTheme({
      props: { MuiFormControl: { fullWidth: false, margin: 'normal' } },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SelectField checkboxes name="x" />
      </ThemeProvider>,
      { x: { type: String, allowedValues: ['a', 'b'] } },
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

test('<SelectField> - renders a Select', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
});

test('<SelectField> - renders a Select with correct disabled state', () => {
  const element = <SelectField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a Select with correct required state', () => {
  const element = <SelectField name="x" required />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('required')).toBe(true);
});

test('<SelectField> - renders a Select with correct id (inherited)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.id).toBeTruthy();
});

test('<SelectField> - renders a Select with correct id (specified)', () => {
  const element = <SelectField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.id).toBe('y');
});

test('<SelectField> - renders a Select with correct name', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.name).toBe('x');
});

test('<SelectField> - renders a Select with correct options', () => {
  const element = <SelectField name="x" native />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', ''],
    ['a', 'a'],
    ['b', 'b'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a Select with correct options (transform)', () => {
  const element = (
    <SelectField name="x" transform={x => x.toUpperCase()} native />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', ''],
    ['a', 'A'],
    ['b', 'B'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a Select with correct placeholder (implicit)', () => {
  const element = <SelectField name="x" placeholder="y" native />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select).prop('value')).toBe('');
  expect(wrapper.find('option')).toHaveLength(3);
  [
    ['', 'y'],
    ['a', 'a'],
    ['b', 'b'],
  ].forEach(([value, text], index) => {
    const option = wrapper.find('option').at(index);
    expect(option.prop('value')).toBe(value);
    expect(option.text()).toBe(text);
  });
});

test('<SelectField> - renders a Select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('');
});

test('<SelectField> - renders a Select with correct value (model)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('b');
});

test('<SelectField> - renders a Select with correct value (specified)', () => {
  const element = <SelectField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('b');
});

test('<SelectField> - renders a Select which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: 'b' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a Select which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: '' } });
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<SelectField> - renders a Select which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // @ts-expect-error Provide a valid EventTarget.
  wrapper.find(TextField).props().onChange!({ target: { value: 'b' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a label', () => {
  const element = <SelectField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('label')).toBe('y');
});

test('<SelectField> - renders a SelectField with correct error text (showInlineError=true)', () => {
  const error = new Error();
  const element = (
    <SelectField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

test('<SelectField> - renders a SelectField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <SelectField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(0);
});

test('<SelectField> - works with special characters', () => {
  mount(
    <SelectField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField> - disabled items (options) based on predicate', () => {
  const allowedValues = ['a', 'b'];

  const element = (
    <SelectField
      native
      name="x"
      disableItem={value => value === allowedValues[0]}
    />
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues },
    }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find('option').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('option').at(1).prop('disabled')).toBe(false);
});

test('<SelectField> - renders with correct classnames', () => {
  const wrapper = mount(
    <SelectField name="x" textFieldProps={{ className: 'select-class' }} />,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );
  expect(wrapper.find(TextField).props()).toHaveProperty(
    'className',
    'select-class',
  );
});

test('<SelectField> - renders a multiselect with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array, allowedValues: ['a', 'b'] },
      'x.$': { type: String },
    }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toStrictEqual([]);
});

test('<SelectField> - renders a multiselect with correct value (model)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array, allowedValues: ['a', 'b'] },
        'x.$': { type: String },
      },
      { model: { x: ['b'] } },
    ),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toStrictEqual(['b']);
});

test('<SelectField> - renders a multiselect with correct value (specified)', () => {
  const element = <SelectField name="x" value={['b']} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array, allowedValues: ['a', 'b'] },
      'x.$': { type: String },
    }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toStrictEqual(['b']);
});

test('<SelectField checkboxes> - renders a set of Radio buttons', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct disabled state', () => {
  const element = <SelectField checkboxes name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('disabled')).toBe(true);
  expect(wrapper.find(Radio).at(1).prop('disabled')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct id (inherited)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('id')).toBeTruthy();
  expect(wrapper.find(Radio).at(1).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct id (specified)', () => {
  const element = <SelectField checkboxes name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('id')).toBe('y-YQ');
  expect(wrapper.find(Radio).at(1).prop('id')).toBe('y-Yg');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct name', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('name')).toBe('x');
  expect(wrapper.find(Radio).at(1).find('input').prop('name')).toBe('x');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct options', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('label')).toBe('a');
  expect(wrapper.find(FormControlLabel).at(1).prop('label')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct options (transform)', () => {
  const element = (
    <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('label')).toBe('A');
  expect(wrapper.find(FormControlLabel).at(1).prop('label')).toBe('B');
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (default)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('checked')).toBe(false);
  expect(wrapper.find(Radio).at(1).find('input').prop('checked')).toBe(false);
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (model)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('checked')).toBe(false);
  expect(wrapper.find(Radio).at(1).find('input').prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of Radio buttons with correct value (specified)', () => {
  const element = <SelectField checkboxes name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('checked')).toBe(false);
  expect(wrapper.find(Radio).at(1).find('input').prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of Radio buttons which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  // @ts-expect-error Provide a valid value.
  wrapper.find(RadioGroup).props().onChange!({ target: { value: 'b' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array check)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  wrapper.find(Checkbox).at(1).find('input').simulate('change');
  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array uncheck)', () => {
  const onChange = jest.fn();
  const element = <SelectField checkboxes name="x" value={['b']} />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  wrapper.find(Checkbox).at(1).find('input').simulate('change');
  expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of Checkboxes with correct labels', () => {
  const onChange = jest.fn();
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).text()).toBe('a');
  expect(wrapper.find(FormControlLabel).at(1).text()).toBe('b');
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correct labels (transform)', () => {
  const onChange = jest.fn();
  const element = (
    <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />
  );
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).text()).toBe('A');
  expect(wrapper.find(FormControlLabel).at(1).text()).toBe('B');
});

test('<SelectField checkboxes> - renders a set of Radio buttons which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);

  // @ts-expect-error Provide a valid value.
  wrapper.find(RadioGroup).props().onChange!({ target: { value: 'a' } });

  expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
  const element = <SelectField checkboxes name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormLabel).text()).toBe('y *');
});

test('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=true)', () => {
  const error = new Error();
  const element = (
    <SelectField
      checkboxes
      name="x"
      error={error}
      showInlineError
      errorMessage="Error"
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

test('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <SelectField
      checkboxes
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(0);
});

test('<SelectField checkboxes> - renders Checkbox with appearance=checkbox', () => {
  const element = <SelectField appearance="checkbox" checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  expect(wrapper.find(Switch)).toHaveLength(0);
});

test('<SelectField checkboxes> - renders Switch with appearance=switch', () => {
  const element = <SelectField appearance="switch" checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues: ['a', 'b'] },
    }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(0);
  expect(wrapper.find(Switch)).toHaveLength(2);
});

test('<SelectField checkboxes> - works with special characters', () => {
  mount(
    <SelectField checkboxes name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

test('<SelectField checkboxes> - disabled items (checkboxes) based on predicate', () => {
  const allowedValues = ['a', 'b'];

  const element = (
    <SelectField
      appearance="checkbox"
      checkboxes
      name="x"
      disableItem={value => value === allowedValues[0]}
    />
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Array },
      'x.$': { type: String, allowedValues },
    }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('disabled')).toBe(true);
  expect(wrapper.find(FormControlLabel).at(1).prop('disabled')).toBe(false);
});
