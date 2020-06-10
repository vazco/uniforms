import DatePicker from 'antd/lib/date-picker';
import React from 'react';
import moment from 'moment';
import { DateField } from 'uniforms-antd';

import createContext from './_createContext';
import mount from './_mount';

test('<DateField> - renders an input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
});

test('<DateField> - renders a input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('id')).toBeTruthy();
});

test('<DateField> - renders a input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('id')).toBe('y');
});

test('<DateField> - renders a input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('name')).toBe('x');
});

test('<DateField> - renders an input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('disabled')).toBe(true);
});

test('<DateField> - renders a input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('DateFieldLabel');
});

test('<DateField> - renders a input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('value')).toBe(undefined);
});

test('<DateField> - renders a input with correct value (model)', () => {
  const now = moment();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { model: { x: now } }),
  );

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('value')).toEqual(now);
});

test('<DateField> - renders a input with correct value (specified)', () => {
  const now = moment();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  expect(wrapper.find(DatePicker).prop('value')).toEqual(now);
});

test('<DateField> - renders a input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const now = moment();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  // @ts-ignore
  expect(wrapper.find(DatePicker).prop('onChange')(now)).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', now.toDate());
});

test('<DateField> - renders a input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  expect(wrapper.find(DatePicker)).toHaveLength(1);
  // @ts-ignore
  expect(wrapper.find(DatePicker).prop('onChange')(undefined)).toBeFalsy();
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<DateField> - renders a wrapper with unknown props', () => {
  const element = <DateField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(DatePicker).prop('data-x')).toBe('x');
  expect(wrapper.find(DatePicker).prop('data-y')).toBe('y');
  expect(wrapper.find(DatePicker).prop('data-z')).toBe('z');
});
