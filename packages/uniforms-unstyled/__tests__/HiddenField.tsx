import React from 'react';
import { HiddenField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<HiddenField> - renders an input', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
});

test('<HiddenField> - renders an input with correct id (inherited)', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBeTruthy();
});

test('<HiddenField> - renders an input with correct id (specified)', () => {
  const element = <HiddenField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBe('y');
});

test('<HiddenField> - renders an input with correct name', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('name')).toBe('x');
});

test('<HiddenField> - renders an input with correct type', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('type')).toBe('hidden');
});

test('<HiddenField> - renders an input with correct value (default)', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('');
});

test('<HiddenField> - renders an input with correct value (model)', () => {
  const element = <HiddenField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('y');
});

test('<HiddenField> - renders an input which correctly reacts on model change', () => {
  const onChange = jest.fn();

  const element = <HiddenField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  wrapper.setProps({ value: 'y' });

  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<HiddenField> - renders an input which correctly reacts on model change (empty)', () => {
  const onChange = jest.fn();

  const element = <HiddenField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  wrapper.setProps({ value: undefined });

  expect(onChange).not.toHaveBeenCalled();
});

test('<HiddenField> - renders an input which correctly reacts on model change (same value)', () => {
  const onChange = jest.fn();

  const element = <HiddenField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  wrapper.setProps({ value: 'y' });

  expect(onChange).not.toHaveBeenCalled();
});

test('<HiddenField noDOM> - renders nothing', () => {
  const element = <HiddenField noDOM name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.children()).toHaveLength(0);
});

test('<HiddenField noDOM> - renders nothing which correctly reacts on model change', () => {
  const onChange = jest.fn();

  const element = <HiddenField noDOM name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  wrapper.setProps({ value: 'y' });

  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<HiddenField noDOM> - renders nothing which correctly reacts on model change (empty)', () => {
  const onChange = jest.fn();

  const element = <HiddenField noDOM name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  wrapper.setProps({ value: undefined });

  expect(onChange).not.toHaveBeenCalled();
});

test('<HiddenField noDOM> - renders nothing which correctly reacts on model change (same value)', () => {
  const onChange = jest.fn();

  const element = <HiddenField noDOM name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  wrapper.setProps({ value: 'y' });

  expect(onChange).not.toHaveBeenCalled();
});
