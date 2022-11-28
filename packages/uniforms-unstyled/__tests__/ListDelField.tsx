import merge from 'lodash/merge';
import React from 'react';
import { ListDelField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

const onChange = jest.fn();
const context = (schema?: object) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: ['x', 'y', 'z'] } },
  );

beforeEach(() => {
  onChange.mockClear();
});

it('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

it('<ListDelField> - prevents onClick when disabled', () => {
  const element = <ListDelField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find('[role="button"]').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<ListDelField> - prevents onClick when limit reached', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context({ x: { minCount: 3 } }));

  expect(wrapper.find('[role="button"]').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find('[role="button"]').simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});

it('<ListDelField> - correctly reacts on keyboard enter key', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(
    wrapper.find('[role="button"]').simulate('keydown', { key: 'Enter' }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});
