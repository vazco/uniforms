import React from 'react';
import {mount} from 'enzyme';

import SubmitField from 'uniforms-bootstrap4/SubmitField';

import createContext from './_createContext';

test('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

test('<SubmitField> - renders disabled if error', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext(undefined, {error: {}}));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

test('<SubmitField> - renders enabled if error and enabled', () => {
  const element = <SubmitField disabled={false} />;
  const wrapper = mount(element, createContext(undefined, {error: {}}));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(false);
});

test('<SubmitField> - renders a wrapper with correct class', () => {
  const element = <SubmitField wrapClassName="container" />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('.container')).toHaveLength(1);
});

test('<SubmitField> - renders a wrapper with correct value', () => {
  const element = <SubmitField value="Example" />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('Example');
});
