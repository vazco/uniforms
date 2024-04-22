import React from 'react';
import { SelectField } from 'uniforms-semantic';

import createContext from './_createContext';
import mount from './_mount';

test('<SelectField> - renders a label', () => {
  const element = <SelectField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').prop('children')).toBe('y');
  expect(wrapper.find('label').prop('htmlFor')).toBe(
    wrapper.find('select').prop('id'),
  );
});

test('<SelectField> - disabled items (options) based on predicate', () => {
  const element = (
    <SelectField
      name="x"
      options={[
        { key: 'k1', label: 'A', value: 'a', disabled: true },
        { key: 'k2', label: 'B', value: 'b', disabled: false },
      ]}
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('option[value="a"]').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('option[value="b"]').at(0).prop('disabled')).toBe(false);
});

test('<SelectField> - renders a select which correctly reacts on change (first value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'a' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['a']);
});

test('<SelectField> - renders a select which correctly reacts on change (next value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={['b']} />;
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

  expect(wrapper.find('select')).toHaveLength(1);
  expect(
    wrapper.find('select').simulate('change', { target: { value: 'a' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['a', 'b']);
});

test('<SelectField> - renders correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <SelectField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('.ui.red.label').length).toBe(1);
  expect(wrapper.find('.ui.red.label').text()).toBe('Error');
});

test('<SelectField> - renders correct error text (showInlineError=false)', () => {
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

  expect(wrapper.find('.ui.red.label').length).toBe(0);
});

test('<SelectField checkboxes> - disabled items (checkboxes) based on predicate', () => {
  const allowedValues = ['a', 'b'];

  const element = (
    <SelectField
      checkboxes
      name="x"
      options={[
        { key: 'k1', label: 'A', value: 'a', disabled: true },
        { key: 'k2', label: 'B', value: 'b', disabled: false },
      ]}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(false);
});
