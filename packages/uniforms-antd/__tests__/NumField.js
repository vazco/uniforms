import InputNumber from 'antd/lib/input-number';
import React from 'react';
import {mount} from 'enzyme';

import NumField from 'uniforms-antd/NumField';

import createContext from './_createContext';

test('<NumField> - renders an InputNumber', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
});

test('<NumField> - renders an InputNumber with correct disabled state', () => {
  const element = <NumField name="x" disabled />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('disabled')).toBe(true);
});

test('<NumField> - renders an InputNumber with correct id (inherited)', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('id')).toBeTruthy();
});

test('<NumField> - renders an InputNumber with correct id (specified)', () => {
  const element = <NumField name="x" id="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('id')).toBe('y');
});

test('<NumField> - renders an InputNumber with correct max', () => {
  const element = <NumField name="x" max={10} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('max')).toBe(10);
});

test('<NumField> - renders an InputNumber with correct min', () => {
  const element = <NumField name="x" min={10} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('min')).toBe(10);
});

test('<NumField> - renders an InputNumber with correct name', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('name')).toBe('x');
});

test('<NumField> - renders an InputNumber with correct placeholder', () => {
  const element = <NumField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('placeholder')).toBe('y');
});

test('<NumField> - renders an InputNumber with correct step (decimal)', () => {
  const element = <NumField name="x" decimal />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('step')).toBe(0.01);
});

test('<NumField> - renders an InputNumber with correct step (integer)', () => {
  const element = <NumField name="x" decimal={false} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('step')).toBe(1);
});

test('<NumField> - renders an InputNumber with correct value (default)', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('value')).toBe(undefined);
});

test('<NumField> - renders an InputNumber with correct value (model)', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: 1}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('value')).toBe(1);
});

test('<NumField> - renders an InputNumber with correct value (specified)', () => {
  const element = <NumField name="x" value={2} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber)).toHaveLength(1);
  expect(wrapper.find(InputNumber).prop('value')).toBe(2);
});

test('<NumField> - renders an InputNumber which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: '1'}})).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders an InputNumber which correctly reacts on change (decimal on decimal)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" decimal />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: '2.5'}})).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 2.5);
});

test('<NumField> - renders an InputNumber which correctly reacts on change (decimal on integer)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" decimal={false} />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: '2.5'}})).toBeTruthy();

  // That's how AntD is doing it.
  expect(onChange).toHaveBeenLastCalledWith('x', 2.5);
});

test('<NumField> - renders an InputNumber which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: ''}})).toBeTruthy();

  // That's how AntD is doing it.
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<NumField> - renders an InputNumber which correctly reacts on change (incorrect)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: 'xyz'}})).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<NumField> - renders an InputNumber which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: 1}, onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: '1'}})).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders an InputNumber which correctly reacts on change (zero)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change', {target: {value: '0'}})).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 0);
});

test('<NumField> - renders a label', () => {
  const element = <NumField name="x" label="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('y');
});

test('<NumField> - renders a wrapper with unknown props', () => {
  const element = <NumField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(InputNumber).prop('data-x')).toBe('x');
  expect(wrapper.find(InputNumber).prop('data-y')).toBe('y');
  expect(wrapper.find(InputNumber).prop('data-z')).toBe('z');
});
