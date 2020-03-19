import React from 'react';
import { AutoFields } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<AutoFields> - works', () => {
  const element = <AutoFields />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('AutoFields')).toHaveLength(1);
});

test('<AutoFields> - render all fields by default', () => {
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

test('<AutoFields> - renders only specified fields', () => {
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

test('<AutoFields> - does not render ommited fields', () => {
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

test('<AutoFields> - works with custom component', () => {
  const Component = jest.fn(() => null);

  const element = <AutoFields autoField={Component} />;
  mount(
    element,
    createContext({
      x: { type: String },
      y: { type: String },
      z: { type: String },
    }),
  );

  expect(Component).toHaveBeenCalledTimes(3);
});

test('<AutoFields> - wraps fields in specified element', () => {
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
