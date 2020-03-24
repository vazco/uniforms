import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { ListAddField, ListField, ListItemField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<ListField> - works', () => {
  const element = <ListField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListField)).toHaveLength(1);
});

test('<ListField> - renders ListAddField', () => {
  const element = <ListField name="x" label="ListFieldLabel" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListAddField)).toHaveLength(1);
  expect(wrapper.find(ListAddField).prop('name')).toBe('x.$');
});

test('<ListField> - renders correct label and info (specified)', () => {
  const element = (
    <ListField name="x" label="ListFieldLabel" info="ListFieldInfo" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(Tooltip)).toHaveLength(1);
  expect(wrapper.find(Tooltip).prop('title')).toBe('ListFieldInfo');
});

test('<ListField> - renders correct label (specified)', () => {
  const element = <ListField name="x" label="ListFieldLabel" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(
    wrapper
      .find('ul > div')
      .at(0)
      .text(),
  ).toEqual(expect.stringContaining('ListFieldLabel'));
});

test('<ListField> - renders correct numer of items with initialCount (specified)', () => {
  const element = <ListField name="x" initialCount={3} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find('input')).toHaveLength(3);
});

test('<ListField> - passes itemProps to its children', () => {
  const element = (
    <ListField name="x" initialCount={3} itemProps={{ 'data-xyz': 1 }} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(
    wrapper
      .find(ListItemField)
      .first()
      .prop('data-xyz'),
  ).toBe(1);
});

test('<ListField> - renders children (specified)', () => {
  const Child = jest.fn(() => null);

  const element = (
    <ListField name="x" initialCount={2}>
      <Child />
    </ListField>
  );
  mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(Child).toHaveBeenCalledTimes(2);
});

test('<ListField> - renders children with correct name (children)', () => {
  const Child = jest.fn(() => <div />);

  const element = (
    <ListField name="x" initialCount={2}>
      <Child name="$" />
    </ListField>
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(
    wrapper
      .find(Child)
      .at(0)
      .prop('name'),
  ).toBe('x.0');
  expect(
    wrapper
      .find(Child)
      .at(1)
      .prop('name'),
  ).toBe('x.1');
});

test('<ListField> - renders children with correct name (value)', () => {
  const element = <ListField name="x" initialCount={2} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(
    wrapper
      .find(ListItemField)
      .at(0)
      .prop('name'),
  ).toBe('x.0');
  expect(
    wrapper
      .find(ListItemField)
      .at(1)
      .prop('name'),
  ).toBe('x.1');
});

test('<ListField> - renders correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <ListField name="x" error={error} errorMessage="Error" showInlineError />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(
    wrapper
      .find('ul > div')
      .at(0)
      .text(),
  ).toBe('Error');
});
