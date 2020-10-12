import Input from 'antd/lib/input';
import React from 'react';
import { TextField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<TextField> - renders an input', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
});

test('<TextField> - renders an input with correct disabled state', () => {
  const element = <TextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('disabled')).toBe(true);
});

test('<TextField> - renders an input with correct id (inherited)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('id')).toBeTruthy();
});

test('<TextField> - renders an input with correct id (specified)', () => {
  const element = <TextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('id')).toBe('y');
});

test('<TextField> - renders an input with correct name', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('name')).toBe('x');
});

test('<TextField> - renders an input with correct placeholder', () => {
  const element = <TextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('placeholder')).toBe('y');
});

test('<TextField> - renders an input with correct type', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('type')).toBe('text');
});

test('<TextField> - renders an input with correct value (default)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('value')).toBe('');
});

test('<TextField> - renders an input with correct value (model)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('value')).toBe('y');
});

test('<TextField> - renders an input with correct value (specified)', () => {
  const element = <TextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Input).prop('value')).toBe('y');
});

test('<TextField> - renders an input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(
    wrapper.find(Input).simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<TextField> - renders an input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(
    wrapper.find(Input).simulate('change', { target: { value: '' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<TextField> - renders an input which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  expect(wrapper.find(Input)).toHaveLength(1);
  expect(
    wrapper.find(Input).simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<TextField> - renders a label', () => {
  const element = <TextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('y');
});

test('<TextField> - renders a wrapper with unknown props', () => {
  const element = <TextField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input).prop('data-x')).toBe('x');
  expect(wrapper.find(Input).prop('data-y')).toBe('y');
  expect(wrapper.find(Input).prop('data-z')).toBe('z');
});

test('<TextField> - renders a input with correct type prop', () => {
  const element = <TextField name="x" type="password" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input).prop('type')).toBe('password');
});

test('<TextField> - renders a input with autocomplete turned off', () => {
  const element = <TextField name="x" autoComplete="off" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(Input).prop('autoComplete')).toBe('off');
});
