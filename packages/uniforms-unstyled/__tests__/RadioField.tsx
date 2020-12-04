import React from 'react';
import { RadioField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<RadioField> - renders a set of checkboxes', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
});

test('<RadioField> - renders a set of checkboxes with correct disabled state', () => {
  const element = <RadioField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
  expect(wrapper.find('input').at(1).prop('disabled')).toBe(true);
});

test('<RadioField> - renders a set of checkboxes with correct id (inherited)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBeTruthy();
  expect(wrapper.find('input').at(1).prop('id')).toBeTruthy();
});

test('<RadioField> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <RadioField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('id')).toBe('y-YQ');
  expect(wrapper.find('input').at(1).prop('id')).toBe('y-Yg');
});

test('<RadioField> - renders a set of checkboxes with correct name', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('name')).toBe('x');
  expect(wrapper.find('input').at(1).prop('name')).toBe('x');
});

test('<RadioField> - renders a set of checkboxes with correct options', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('a');
  expect(wrapper.find('label').at(1).text()).toBe('b');
});

test('<RadioField> - renders a set of checkboxes with correct options (transform)', () => {
  const element = <RadioField name="x" transform={x => x.toUpperCase()} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(2);
  expect(wrapper.find('label').at(0).text()).toBe('A');
  expect(wrapper.find('label').at(1).text()).toBe('B');
});

test('<RadioField> - renders a set of checkboxes with correct value (default)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(false);
});

test('<RadioField> - renders a set of checkboxes with correct value (model)', () => {
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

test('<RadioField> - renders a set of checkboxes with correct value (specified)', () => {
  const element = <RadioField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('input')).toHaveLength(2);
  expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
  expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

test('<RadioField> - renders a set of checkboxes which correctly reacts on change', () => {
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

test('<RadioField> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
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

test('<RadioField> - renders a label', () => {
  const element = <RadioField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('label')).toHaveLength(3);
  expect(wrapper.find('label').at(0).text()).toBe('y');
});

test('<RadioField> - renders a wrapper with unknown props', () => {
  const element = <RadioField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});

test('<RadioField> - works with special characters', () => {
  mount(
    <RadioField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});
