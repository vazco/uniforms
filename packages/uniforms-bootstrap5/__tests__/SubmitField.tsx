import React from 'react';
import { SubmitField } from 'uniforms-bootstrap5';

import createContext from './_createContext';
import mount from './_mount';

it('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

it('<SubmitField> - renders disabled if error', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('<SubmitField> - renders enabled if error and enabled', () => {
  const element = <SubmitField disabled={false} />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(false);
});

it('<SubmitField> - renders a wrapper with correct class', () => {
  const element = <SubmitField wrapClassName="container" />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('.container')).toHaveLength(1);
});

it('<SubmitField> - renders a wrapper with correct value', () => {
  const element = <SubmitField value="Example" />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('Example');
});
