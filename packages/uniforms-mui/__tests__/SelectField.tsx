import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import React from 'react';
import { SelectField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

it('<SelectField> - renders a Select', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
});

it('<SelectField> - renders a Select with correct disabled state', () => {
  const element = <SelectField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

it('<SelectField> - renders a Select with correct required state', () => {
  const element = <SelectField name="x" required />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('required')).toBe(true);
});

it('<SelectField> - renders a Select with correct id (inherited)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.id).toBeTruthy();
});

it('<SelectField> - renders a Select with correct id (specified)', () => {
  const element = <SelectField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.id).toBe('y');
});

it('<SelectField> - renders a Select with correct name', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  // FIXME: inputProps is nullable.
  expect(wrapper.find(Select).prop('inputProps')!.name).toBe('x');
});

it('<SelectField> - renders a Select with correct options', () => {
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

it('<SelectField> - renders a Select with correct options (transform)', () => {
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

it('<SelectField> - renders a Select with correct placeholder (implicit)', () => {
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

it('<SelectField> - renders a Select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('');
});

it('<SelectField> - renders a Select with correct value (model)', () => {
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

it('<SelectField> - renders a Select with correct value (specified)', () => {
  const element = <SelectField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(Select).prop('value')).toBe('b');
});

it('<SelectField> - renders a Select which correctly reacts on change', () => {
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

it('<SelectField> - renders a Select which correctly reacts on change (empty)', () => {
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

it('<SelectField> - renders a Select which correctly reacts on change (same value)', () => {
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

it('<SelectField> - renders a label', () => {
  const element = <SelectField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Select)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('label')).toBe('y');
});

it('<SelectField> - renders a SelectField with correct error text (showInlineError=true)', () => {
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

it('<SelectField> - renders a SelectField with correct error text (showInlineError=false)', () => {
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

it('<SelectField> - works with special characters', () => {
  mount(
    <SelectField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

it('<SelectField> - disabled items (options) based on predicate', () => {
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

it('<SelectField> - renders with correct classnames', () => {
  const wrapper = mount(
    <SelectField name="x" textFieldProps={{ className: 'select-class' }} />,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );
  expect(wrapper.find(TextField).props()).toHaveProperty(
    'className',
    'select-class',
  );
});

it('<SelectField> - renders a multiselect with correct value (default)', () => {
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

it('<SelectField> - renders a multiselect with correct value (model)', () => {
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

it('<SelectField> - renders a multiselect with correct value (specified)', () => {
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

it('<SelectField checkboxes> - renders a set of Radio buttons', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct disabled state', () => {
  const element = <SelectField checkboxes name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('disabled')).toBe(true);
  expect(wrapper.find(Radio).at(1).prop('disabled')).toBe(true);
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct id (inherited)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('id')).toBeTruthy();
  expect(wrapper.find(Radio).at(1).prop('id')).toBeTruthy();
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct id (specified)', () => {
  const element = <SelectField checkboxes name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).prop('id')).toBe('y-YQ');
  expect(wrapper.find(Radio).at(1).prop('id')).toBe('y-Yg');
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct name', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('name')).toBe('x');
  expect(wrapper.find(Radio).at(1).find('input').prop('name')).toBe('x');
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct options', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find(FormControlLabel).at(0).prop('label')).toBe('a');
  expect(wrapper.find(FormControlLabel).at(1).prop('label')).toBe('b');
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct options (transform)', () => {
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

it('<SelectField checkboxes> - renders a set of Radio buttons with correct value (default)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('checked')).toBe(false);
  expect(wrapper.find(Radio).at(1).find('input').prop('checked')).toBe(false);
});

it('<SelectField checkboxes> - renders a set of Radio buttons with correct value (model)', () => {
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

it('<SelectField checkboxes> - renders a set of Radio buttons with correct value (specified)', () => {
  const element = <SelectField checkboxes name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
  expect(wrapper.find(Radio).at(0).find('input').prop('checked')).toBe(false);
  expect(wrapper.find(Radio).at(1).find('input').prop('checked')).toBe(true);
});

it('<SelectField checkboxes> - renders a set of Radio buttons which correctly reacts on change', () => {
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

it('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array check)', () => {
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

it('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array uncheck)', () => {
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

it('<SelectField checkboxes> - renders a set of Checkboxes with correct labels', () => {
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

it('<SelectField checkboxes> - renders a set of Checkboxes which correct labels (transform)', () => {
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

it('<SelectField checkboxes> - renders a set of Radio buttons which correctly reacts on change (same value)', () => {
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

it('<SelectField checkboxes> - renders a label', () => {
  const element = <SelectField checkboxes name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(FormLabel).text()).toBe('y *');
});

it('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=true)', () => {
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

it('<SelectField checkboxes> - renders a SelectField with correct error text (showInlineError=false)', () => {
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

it('<SelectField checkboxes> - renders Checkbox with appearance=checkbox', () => {
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

it('<SelectField checkboxes> - renders Switch with appearance=switch', () => {
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

it('<SelectField checkboxes> - works with special characters', () => {
  mount(
    <SelectField checkboxes name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});

it('<SelectField checkboxes> - disabled items (checkboxes) based on predicate', () => {
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
