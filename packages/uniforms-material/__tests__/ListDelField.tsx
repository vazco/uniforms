import IconButton from '@material-ui/core/IconButton';
import merge from 'lodash/merge';
import React from 'react';
import { ListDelField } from 'uniforms-material';

import createContext from './_createContext';
import mount from './_mount';

const Icon = () => <i />;
const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: ['x', 'y', 'z'] } },
  );

test('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

test('<ListDelField> - prevents onClick when disabled', () => {
  const element = <ListDelField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - prevents onClick when limit reached', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context({ x: { minCount: 3 } }));

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});

test('<ListDelField> - renders correct icon', () => {
  const element = <ListDelField name="x.1" icon={<Icon />} />;
  const wrapper = mount(element, context());

  expect(wrapper.find(Icon)).toHaveLength(1);
});
