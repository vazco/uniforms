import Button from 'antd/lib/button';
import React from 'react';
import { SubmitField } from 'uniforms-antd';

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
  expect(wrapper.find(Button).prop('disabled')).toBe(true);
});

it('<SubmitField> - renders enabled if error and enabled', () => {
  const element = <SubmitField disabled={false} />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find(Button).prop('disabled')).toBe(false);
});
