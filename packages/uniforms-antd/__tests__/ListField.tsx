import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { ListAddField, ListField, ListItemField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<ListField> - renders ListAddField', () => {
  const element = <ListField name="x" label="ListFieldLabel" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListAddField)).toHaveLength(1);
  expect(wrapper.find(ListAddField).prop('name')).toBe('$');
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

  expect(wrapper.find('div > div').at(0).text()).toEqual(
    expect.stringContaining('ListFieldLabel'),
  );
});

test('<ListField> - renders correct numer of items with model (specified)', () => {
  const element = <ListField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }, undefined, {
      x: [undefined, undefined, undefined],
    }),
  );

  expect(wrapper.find('input')).toHaveLength(3);
});

test('<ListField> - passes itemProps to its children', () => {
  const element = <ListField name="x" itemProps={{ 'data-xyz': 1 }} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }, undefined, {
      x: [undefined],
    }),
  );

  expect(wrapper.find(ListItemField).first().prop('data-xyz')).toBe(1);
});

test('<ListField> - renders children (specified)', () => {
  const Child = jest.fn(() => <div />) as React.FC<any>;

  const element = (
    <ListField name="x">
      <Child />
      PlainText
    </ListField>
  );
  mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }, undefined, {
      x: [undefined, undefined],
    }),
  );

  expect(Child).toHaveBeenCalledTimes(2);
});

test('<ListField> - renders children with correct name (children)', () => {
  const Child = jest.fn(() => <div />) as React.FC<any>;

  const element = (
    <ListField name="x">
      <Child name="$" />
    </ListField>
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }, undefined, {
      x: [undefined, undefined],
    }),
  );

  expect(wrapper.find(Child).at(0).prop('name')).toBe('0');
  expect(wrapper.find(Child).at(1).prop('name')).toBe('1');
});

test('<ListField> - renders children with correct name (value)', () => {
  const element = <ListField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }, undefined, {
      x: [undefined, undefined],
    }),
  );

  expect(wrapper.find(ListItemField).at(0).prop('name')).toBe('0');
  expect(wrapper.find(ListItemField).at(1).prop('name')).toBe('1');
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

  expect(wrapper.find('div > div').at(0).text()).toBe('Error');
});

test('<ListField> - renders correct error style', () => {
  const error = new Error();
  const element = <ListField name="x" error={error} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find('div').at(0).prop('style')).toHaveProperty(
    'borderColor',
    'rgb(255, 85, 0)',
  );
});

test('<ListField> - renders correct error style (with specified style prop)', () => {
  const error = new Error();
  const element = (
    <ListField name="x" error={error} style={{ marginLeft: '8px' }} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find('div').at(0).prop('style')).toHaveProperty(
    'marginLeft',
    '8px',
  );
});

test('<ListField> - renders proper number of optional values after add new value', () => {
  const element = <ListField name="x" label="ListFieldLabel" />;
  const onChange = jest.fn();
  const wrapper = mount(
    element,
    createContext(
      { x: { type: Array, optional: true }, 'x.$': { type: String } },
      { onChange },
      {
        x: [undefined, undefined, undefined],
      },
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
