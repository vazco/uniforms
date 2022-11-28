import IconButton from '@mui/material/IconButton';
import merge from 'lodash/merge';
import React from 'react';
import { ListDelField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

const Icon = () => <i />;
const onChange = jest.fn();
const context = (schema?: object) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: ['x', 'y', 'z'] } },
  );

it('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

// TODO[rtl]
// Strange enzyme behavior
// Cannot read properties of null (reading '__reactFiber$ap6ft6j7fg7')
test.skip('<ListDelField> - prevents onClick when disabled', () => {
  const element = <ListDelField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test.skip('<ListDelField> - prevents onClick when readOnly', () => {
  const element = <ListDelField name="x.1" readOnly />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test.skip('<ListDelField> - prevents onClick when limit reached', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context({ x: { minCount: 3 } }));

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test.skip('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IconButton).simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});

it('<ListDelField> - renders correct icon', () => {
  const element = <ListDelField name="x.1" icon={<Icon />} />;
  const wrapper = mount(element, context());

  expect(wrapper.find(Icon)).toHaveLength(1);
});
