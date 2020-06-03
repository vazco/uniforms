import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import merge from 'lodash/merge';
import { ListAddField } from 'uniforms-material';

import createContext from './_createContext';
import mount from './_mount';

const Icon = () => <i />;
const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: [] } },
  );

test('<ListAddField> - works', () => {
  const element = <ListAddField name="x.$" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListAddField)).toHaveLength(1);
});

test('<ListAddField> - prevents onClick when disabled', () => {
  const element = <ListAddField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - prevents onClick when limit reached', () => {
  const element = <ListAddField name="x.1" />;
  const wrapper = mount(element, context({ x: { maxCount: 0 } }));

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - correctly reacts on click', () => {
  const element = <ListAddField name="x.1" value="y" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['y']);
});

test('<ListAddField> - renders correct icon', () => {
  const element = <ListAddField name="x.$" icon={<Icon />} />;
  const wrapper = mount(element, context());

  expect(wrapper.find(Icon)).toHaveLength(1);
});
