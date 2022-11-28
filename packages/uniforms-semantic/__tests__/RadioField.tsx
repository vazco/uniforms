import React from 'react';
import { RadioField } from 'uniforms-semantic';

import createContext from './_createContext';
import mount from './_mount';

it('<RadioField> - renders a set of checkboxes', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
});

it('<RadioField> - renders a set of checkboxes with correct disabled state', () => {
  const element = <RadioField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(true);
});

it('<RadioField> - renders a set of checkboxes with correct readOnly state', () => {
  const onChange = jest.fn();

  const element = <RadioField name="x" readOnly />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<RadioField> - renders a set of checkboxes with correct id (inherited)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBeTruthy();
  expect(wrapper.find('input').at(1).prop('id')).toBeTruthy();
});

it('<RadioField> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <RadioField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBe('y-YQ');
  expect(wrapper.find('input').at(1).prop('id')).toBe('y-Yg');
});

it('<RadioField> - renders a set of checkboxes with correct name', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('name')).toBe('x');
  expect(wrapper.find('input').at(1).prop('name')).toBe('x');
});

it('<RadioField> - renders a set of checkboxes with correct options', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('a');
  expect(wrapper.find('label').at(1).text()).toBe('b');
});

it('<RadioField> - renders a set of checkboxes with correct options (transform)', () => {
  const element = <RadioField name="x" transform={x => x.toUpperCase()} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('A');
  expect(wrapper.find('label').at(1).text()).toBe('B');
});

it('<RadioField> - renders a set of checkboxes with correct value (default)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(false);
});

it('<RadioField> - renders a set of checkboxes with correct value (model)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

it('<RadioField> - renders a set of checkboxes with correct value (specified)', () => {
  const element = <RadioField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

it('<RadioField> - renders a set of checkboxes which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

it('<RadioField> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

it('<RadioField> - renders a label', () => {
  const element = <RadioField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(3);
  expect(wrapper.find('label').at(0).text()).toBe('y');
});

it('<RadioField> - renders a wrapper with unknown props', () => {
  const element = <RadioField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});

it('<RadioField> - renders correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <RadioField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('.ui.red.label').length).toBe(1);
  expect(wrapper.find('.ui.red.label').text()).toBe('Error');
});

it('<RadioField> - renders correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <RadioField
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

it('<RadioField> - works with special characters', () => {
  mount(
    <RadioField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});
