import Button from 'antd/lib/button';
import React from 'react';
import merge from 'lodash/merge';
import { ListAddField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: [] } },
  );

beforeEach(() => {
  onChange.mockClear();
});

test('<ListAddField> - works', () => {
  const element = <ListAddField name="x.$" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(ListAddField)).toHaveLength(1);
});

test('<ListAddField> - default props override', () => {
  const buttonProps = {
    icon: <span id="icon" />,
    size: 'large' as const,
    style: {},
    type: 'default' as const,
  };

  const element = <ListAddField name="x.$" {...buttonProps} />;
  const wrapper = mount(element, context());

  expect(wrapper.find(Button).props()).toEqual(
    expect.objectContaining(buttonProps),
  );
});

test('<ListAddField> - prevents onClick when disabled', () => {
  const element = <ListAddField name="x.1" disabled />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - prevents onClick when limit reached', () => {
  const element = <ListAddField name="x.1" />;
  const wrapper = mount(element, context({ x: { maxCount: 0 } }));

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - correctly reacts on click', () => {
  const element = <ListAddField name="x.1" value="y" />;
  const wrapper = mount(element, context());

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['y']);
});
