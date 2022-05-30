import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { DateField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

test('<DateField> - renders Input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput)).toHaveLength(1);
});

test('<DateField> - renders a Input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('id')).toBeTruthy();
});

test('<DateField> - renders a Input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('id')).toBe('y');
});

test('<DateField> - renders a Input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('name')).toBe('x');
});

test('<DateField> - renders an Input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

test('<DateField> - renders an Input with correct readOnly state', () => {
  const element = <DateField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('inputProps')!.readOnly).toBe(true);
});

test('<DateField> - renders a Input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormLabel).text()).toBe('DateFieldLabel *');
});

test('<DateField> - renders a Input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('value')).toBe('');
});

test('<DateField> - renders a Input with correct value (model)', () => {
  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { model: { x: now } }),
  );

  expect(wrapper.find(OutlinedInput).prop('value')).toEqual(
    now.toISOString().slice(0, -8),
  );
});

test('<DateField> - renders a Input with correct value (specified)', () => {
  const now = new Date();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('value')).toEqual(
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

  wrapper.find(OutlinedInput).props().onChange!({
    // @ts-expect-error Provide a valid EventTarget.
    target: { valueAsNumber: now },
  });
  expect(onChange).toHaveBeenLastCalledWith('x', now);
});

test('<DateField> - renders a Input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  wrapper.find(OutlinedInput).props().onChange!({
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

  wrapper.find(OutlinedInput).props().onChange!({
    // @ts-expect-error Provide a valid EventTarget.
    target: { valueAsNumber: now },
  });
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
