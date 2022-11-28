import React from 'react';
import { SubmitField } from 'uniforms-unstyled';

import createContext from './_createContext';
import mount from './_mount';

test('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

test('<SubmitField> - renders disabled if error', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

test('<SubmitField> - renders enabled if error and enabled', () => {
  const element = <SubmitField disabled={false} />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(false);
});

test('<SubmitField> - renders a wrapper with correct value', () => {
  const element = <SubmitField value="Example" />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('Example');
});
