import React from 'react';
import { SubmitField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

it('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

it('<SubmitField> - renders SubmitField with correct disabled state', () => {
  const element = <SubmitField disabled />;
  const wrapper = mount(element, createContext());

  expect(wrapper.children().first().prop('disabled')).toBe(true);
});

it('<SubmitField> - renders SubmitField with correct disabled state when error (context)', () => {
  const error = new Error();
  const element = <SubmitField />;
  const wrapper = mount(element, createContext({}, { error }));

  expect(wrapper.children().first().prop('disabled')).toBe(true);
});
