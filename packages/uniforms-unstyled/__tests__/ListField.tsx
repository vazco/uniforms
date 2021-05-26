import { screen } from '@testing-library/react';
import React from 'react';
import { ListAddField, ListField, ListItemField } from 'uniforms-unstyled';
import { testListField } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - ListField tests', () => {
  testListField(ListField, {
    addFieldLocator: () => screen.getAllByRole('button')[0],
  });
});

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
  expect(wrapper.find(ListAddField).prop('name')).toBe('$');
});

test('<ListField> - renders correct label (specified)', () => {
  const element = <ListField name="x" label="ListFieldLabel" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toEqual(
    expect.stringContaining('ListFieldLabel'),
  );
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

  expect(wrapper.find(ListItemField).first().prop('data-xyz')).toBe(1);
});

test('<ListField> - renders children (specified)', () => {
  const Child = jest.fn(() => <div />) as React.FC<any>;

  const element = (
    <ListField name="x" initialCount={2}>
      <Child />
      PlainText
    </ListField>
  );
  mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(Child).toHaveBeenCalledTimes(2);
});

test('<ListField> - renders children with correct name (children)', () => {
  const Child = jest.fn(() => <div />) as React.FC<any>;

  const element = (
    <ListField name="x" initialCount={2}>
      <Child name="$" />
    </ListField>
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(Child).at(0).prop('name')).toBe('0');
  expect(wrapper.find(Child).at(1).prop('name')).toBe('1');
});

test('<ListField> - renders children with correct name (value)', () => {
  const element = <ListField name="x" initialCount={2} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListItemField).at(0).prop('name')).toBe('0');
  expect(wrapper.find(ListItemField).at(1).prop('name')).toBe('1');
});

test('<ListField> - renders proper number of optional values after add new value (with initialCount)', () => {
  const element = (
    <ListField name="x" initialCount={3} label="ListFieldLabel" />
  );
  const onChange = jest.fn();
  const wrapper = mount(
    element,
    createContext(
      { x: { type: Array, optional: true }, 'x.$': { type: String } },
      { onChange },
    ),
  );
  expect(wrapper.find(ListAddField).simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenNthCalledWith(1, 'x', [
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
});
