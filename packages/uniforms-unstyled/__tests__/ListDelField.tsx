import React from 'react';
import { ListDelField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

const parent = {
  maxCount: 3,
  minCount: 0,
  value: ['x', 'y', 'z']
};

test('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" parent={parent} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

test('<ListDelField> - prevents onClick when disabled', () => {
  const onChange = jest.fn();

  const element = (
    <ListDelField
      name="x.1"
      disabled
      parent={Object.assign({}, parent, { onChange })}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - prevents onClick when limit reached', () => {
  const onChange = jest.fn();

  const element = (
    <ListDelField
      name="x.1"
      parent={Object.assign({}, parent, { onChange, minCount: 3 })}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - correctly reacts on click', () => {
  const onChange = jest.fn();

  const element = (
    <ListDelField name="x.1" parent={Object.assign({}, parent, { onChange })} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find('span').simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith(['x', 'z']);
});
