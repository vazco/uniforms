import React from 'react';
import { BoolField } from 'uniforms-bootstrap3';

import createContext from './_createContext';
import mount from './_mount';

it('<BoolField> - renders an input', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
});

it('<BoolField> - renders an inline input', () => {
  const element = <BoolField name="x" inline />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('.checkbox-inline')).toHaveLength(1);
});

it('<BoolField> - renders a input with correct id (inherited)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBeTruthy();
});

it('<BoolField> - renders a input with correct id (specified)', () => {
  const element = <BoolField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBe('y');
});

it('<BoolField> - renders a input with correct name', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('name')).toBe('x');
});

it('<BoolField> - renders an input with correct type', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('type')).toBe('checkbox');
});

it('<BoolField> - renders an input with correct disabled state', () => {
  const element = <BoolField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('<BoolField> - renders an input with correct readOnly state', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" readOnly />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it('<BoolField> - renders a input with correct label (specified)', () => {
  const element = <BoolField name="x" label="BoolFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe(' BoolFieldLabel'); // Label is prefixed with a &nbsp;.
  expect(wrapper.find('label').prop('htmlFor')).toBe(
    wrapper.find('input').prop('id'),
  );
});

it('<BoolField> - renders a input with correct value (default)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('checked')).toBe(false);
});

it('<BoolField> - renders a input with correct value (model)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('checked')).toBe(true);
});

it('<BoolField> - renders a input with correct value (specified)', () => {
  const element = <BoolField name="x" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('checked')).toBe(true);
});

it('<BoolField> - renders a input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').simulate('change')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', true);
});

it('<BoolField> - renders a wrapper with unknown props', () => {
  const element = <BoolField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});
