import Radio from 'antd/lib/radio';
import React from 'react';
import { RadioField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

it('<RadioField> - renders a set of checkboxes', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio)).toHaveLength(2);
});

it('<RadioField> - renders a set of checkboxes with correct disabled state', () => {
  const element = <RadioField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('disabled')).toBe(true);
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(
    // @ts-expect-error
    wrapper.find(Radio.Group).prop('onChange')({ target: { value: 'b' } }),
  ).toBeFalsy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<RadioField> - renders a set of checkboxes with correct id (inherited)', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('id')).toBeTruthy();
});

it('<RadioField> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <RadioField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('id')).toBe('y');
});

it('<RadioField> - renders a set of checkboxes with correct name', () => {
  const element = <RadioField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('name')).toBe('x');
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('value')).toBe('');
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('value')).toBe('b');
});

it('<RadioField> - renders a set of checkboxes with correct value (specified)', () => {
  const element = <RadioField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(wrapper.find(Radio.Group).prop('value')).toBe('b');
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(
    // @ts-expect-error
    wrapper.find(Radio.Group).prop('onChange')({ target: { value: 'b' } }),
  ).toBeFalsy();
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

  expect(wrapper.find(Radio.Group)).toHaveLength(1);
  expect(
    // @ts-expect-error
    wrapper.find(Radio.Group).prop('onChange')({ target: { value: 'a' } }),
  ).toBeFalsy();
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

  expect(wrapper.find(Radio.Group).prop('data-x')).toBe('x');
  expect(wrapper.find(Radio.Group).prop('data-y')).toBe('y');
  expect(wrapper.find(Radio.Group).prop('data-z')).toBe('z');
});

it('<RadioField> - works with special characters', () => {
  mount(
    <RadioField name="x" />,
    createContext({ x: { type: String, allowedValues: ['ă', 'ș'] } }),
  );
});
