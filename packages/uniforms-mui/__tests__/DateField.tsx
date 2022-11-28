import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { DateField } from 'uniforms-mui';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - DateField tests', () => {
  it('<DateField> - handles "date" type correctly', () => {
    const onChange = jest.fn();
    const initialDate = new Date(Date.UTC(2020, 0, 1));

    render(
      <DateField name="x" type="date" placeholder="X" value={initialDate} />,
      { x: Date },
      { onChange },
    );

    const wrapper = screen.getByPlaceholderText('X');
    // @ts-expect-error Incorrect types, approach taken from docs: https://testing-library.com/docs/example-input-event/
    expect(wrapper.value).toBe('2020-01-01');
    userEvent.type(wrapper, '2021-03-03');
    expect(onChange.mock.calls[1][0]).toBe('x');
    expect(onChange.mock.calls[1][1].toISOString()).toBe(
      '2021-03-03T00:00:00.000Z',
    );
  });
});

it('<DateField> - renders Input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput)).toHaveLength(1);
});

it('<DateField> - renders a Input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('id')).toBeTruthy();
});

it('<DateField> - renders a Input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('id')).toBe('y');
});

it('<DateField> - renders a Input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('name')).toBe('x');
});

it('<DateField> - renders an Input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

it('<DateField> - renders an Input with correct readOnly state', () => {
  const element = <DateField name="x" inputProps={{ readOnly: true }} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('inputProps')!.readOnly).toBe(true);
});

it('<DateField> - renders a Input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormLabel).text()).toBe('DateFieldLabel *');
});

it('<DateField> - renders a Input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('value')).toBe('');
});

it('<DateField> - renders a Input with correct value (model)', () => {
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

it('<DateField> - renders a Input with correct value (specified)', () => {
  const now = new Date();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(OutlinedInput).prop('value')).toEqual(
    now.toISOString().slice(0, -8),
  );
});

it('<DateField> - renders a Input which correctly reacts on change', () => {
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

it('<DateField> - renders a Input which correctly reacts on change (empty)', () => {
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

it('<DateField> - renders a Input which correctly reacts on change (overflow)', () => {
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

it('<DateField> - renders a Input with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <DateField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

it('<DateField> - renders a Input with correct error text (showInlineError=false)', () => {
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
