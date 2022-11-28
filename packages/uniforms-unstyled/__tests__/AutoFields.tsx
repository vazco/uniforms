import React from 'react';
import { AutoFields } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

it('<AutoFields> - works', () => {
  const element = <AutoFields />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('AutoFields')).toHaveLength(1);
});

it('<AutoFields> - render all fields by default', () => {
  const element = <AutoFields />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: String },
      y: { type: String },
      z: { type: String },
    }),
  );

  expect(wrapper.find('input')).toHaveLength(3);
});

it('<AutoFields> - renders only specified fields', () => {
  const element = <AutoFields fields={['x', 'y']} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: String },
      y: { type: String },
      z: { type: String },
    }),
  );

  expect(wrapper.find('input').someWhere(e => e.prop('name') === 'z')).toBe(
    false,
  );
});

it('<AutoFields> - does not render ommited fields', () => {
  const element = <AutoFields omitFields={['x']} />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: String },
      y: { type: String },
      z: { type: String },
    }),
  );

  expect(wrapper.find('input').someWhere(e => e.prop('name') === 'x')).toBe(
    false,
  );
});

it('<AutoFields> - wraps fields in specified element', () => {
  const element = <AutoFields element="section" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: String },
      y: { type: String },
      z: { type: String },
    }),
  );

  expect(wrapper.find('section').find('input')).toHaveLength(3);
});
