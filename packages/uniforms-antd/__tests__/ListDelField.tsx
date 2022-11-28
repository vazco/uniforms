import Button from 'antd/lib/button';
import merge from 'lodash/merge';
import React from 'react';
import { ListDelField } from 'uniforms-antd';

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

it('<ListDelField> - default props override', () => {
  const buttonProps = {
    icon: <span id="icon" />,
    size: 'large' as const,
    shape: 'circle' as const,
    style: {},
    type: 'default' as const,
  };

  const element = <ListDelField name="x.1" {...buttonProps} />;
  const wrapper = mount(element, context());

  expect(wrapper.find(Button).props()).toEqual(
    expect.objectContaining(buttonProps),
  );
});

it('<ListDelField> - prevents onClick when disabled', () => {
  const element = <ListDelField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<ListDelField> - prevents onClick when readOnly', () => {
  const element = <ListDelField name="x.1" readOnly />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<ListDelField> - prevents onClick when limit reached', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context({ x: { minCount: 3 } }));

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});
