import React from 'react';
import { ErrorField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

const error = {
  error: 'validation-error',
  reason: 'X is required',
  details: [{ name: 'x', type: 'required', details: { value: null } }],
  message: 'X is required [validation-error]',
};

test('<ErrorField> - works', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField)).toHaveLength(1);
});

test('<ErrorField> - default props override', () => {
  const divProps = { style: {} };

  const element = <ErrorField name="x" {...divProps} />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField).childAt(0).props()).toEqual(
    expect.objectContaining(divProps),
  );
});

test('<ErrorField> - renders correct error message (context)', () => {
  const element = <ErrorField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { error }),
  );

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('X is required');
});

test('<ErrorField> - renders correct error message (specified)', () => {
  const element = (
    <ErrorField
      name="x"
      error={error.details[0]}
      errorMessage="X is required"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('X is required');
});

test('<ErrorField> - renders correct children if specified', () => {
  const element = <ErrorField name="x">Error</ErrorField>;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { error }),
  );

  expect(wrapper.find(ErrorField)).toHaveLength(1);
  expect(wrapper.find(ErrorField).text()).toBe('Error');
});
