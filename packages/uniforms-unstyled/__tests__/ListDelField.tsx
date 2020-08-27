import merge from 'lodash/merge';
import React from 'react';
import { ListDelField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: ['x', 'y', 'z'] } },
  );

beforeEach(() => {
  onChange.mockClear();
});

test('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

test('<ListDelField> - prevents onClick when disabled', () => {
  const element = <ListDelField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - prevents onClick when limit reached', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context({ x: { minCount: 3 } }));

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});
