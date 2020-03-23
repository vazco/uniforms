import Checkbox from 'antd/lib/checkbox';
import React from 'react';
import Switch from 'antd/lib/switch';
import { BoolField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<BoolField> - renders a switch input', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
});

test('<BoolField> - renders a checkbox input', () => {
  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
});

test('<BoolField> - renders a switch input with correct id (inherited)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a checkbox input with correct id (inherited)', () => {
  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a switch input with correct id (specified)', () => {
  const element = <BoolField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('id')).toBe('y');
});

test('<BoolField> - renders a checkbox input with correct id (specified)', () => {
  const element = <BoolField checkbox name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('id')).toBe('y');
});

test('<BoolField> - renders a switch input with correct name', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('name')).toBe('x');
});

test('<BoolField> - renders a checkbox input with correct name', () => {
  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('name')).toBe('x');
});

test('<BoolField> - renders a switch input with correct disabled state', () => {
  const element = <BoolField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a checkbox input with correct disabled state', () => {
  const element = <BoolField checkbox name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a switch input with correct label (specified)', () => {
  const element = <BoolField name="x" label="BoolFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('BoolFieldLabel'); // Label is prefixed with a &nbsp;.
});

test('<BoolField> - renders a checkbox input with correct label (specified)', () => {
  const element = <BoolField checkbox name="x" label="BoolFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find('label')).toHaveLength(2);
  expect(
    wrapper
      .find('label')
      .first()
      .text(),
  ).toBe('BoolFieldLabel'); // Label is prefixed with a &nbsp;.
});

test('<BoolField> - renders a switch input with correct value (default)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(false);
});

test('<BoolField> - renders a checkbox input with correct value (default)', () => {
  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(false);
});

test('<BoolField> - renders a switch input with correct value (model)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(true);
});

test('<BoolField> - renders a checkbox input with correct value (model)', () => {
  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a switch input with correct value (specified)', () => {
  const element = <BoolField name="x" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(true);
});

test('<BoolField> - renders a checkbox input with correct value (specified)', () => {
  const element = <BoolField checkbox name="x" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a switch input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('onChange')()).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', true);
});

test('<BoolField> - renders a checkbox input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField checkbox name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('onChange')()).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', true);
});

test('<BoolField> - renders a switch wrapper with unknown props', () => {
  const element = <BoolField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch).prop('data-x')).toBe('x');
  expect(wrapper.find(Switch).prop('data-y')).toBe('y');
  expect(wrapper.find(Switch).prop('data-z')).toBe('z');
});

test('<BoolField> - renders a checkbox wrapper with unknown props', () => {
  const element = (
    <BoolField checkbox name="x" data-x="x" data-y="y" data-z="z" />
  );
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox).prop('data-x')).toBe('x');
  expect(wrapper.find(Checkbox).prop('data-y')).toBe('y');
  expect(wrapper.find(Checkbox).prop('data-z')).toBe('z');
});
