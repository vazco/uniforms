import DateField from 'uniforms-material/DateField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import React from 'react';
import {mount} from 'enzyme';

import createContext from './_createContext';

test('<DateField> - renders Input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input)).toHaveLength(1);
});

test('<DateField> - renders a Input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input).prop('id')).toBeTruthy();
});

test('<DateField> - renders a Input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input).prop('id')).toBe('y');
});

test('<DateField> - renders a Input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input).prop('name')).toBe('x');
});

test('<DateField> - renders an Input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(FormControl).prop('disabled')).toBe(true);
});

test('<DateField> - renders a Input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(FormLabel).text()).toBe('DateFieldLabel *');
});

test('<DateField> - renders a Input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input).prop('value')).toBe('');
});

test('<DateField> - renders a Input with correct value (model)', () => {
  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}, {model: {x: now}}));

  expect(wrapper.find(Input).prop('value')).toEqual(now.toISOString().slice(0, -8));
});

test('<DateField> - renders a Input with correct value (specified)', () => {
  const now = new Date();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(Input).prop('value')).toEqual(now.toISOString().slice(0, -8));
});

test('<DateField> - renders a Input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}, {onChange}));

  wrapper
    .find(Input)
    .props()
    .onChange({target: {valueAsNumber: now}});
  expect(onChange).toHaveBeenLastCalledWith('x', now);
});

test('<DateField> - renders a Input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}, {onChange}));

  wrapper
    .find(Input)
    .props()
    .onChange({target: {valueAsNumber: undefined}});
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<DateField> - renders a Input which correctly reacts on change (overflow)', () => {
  const onChange = jest.fn();

  const now = new Date(1e5, 0);
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Date}}, {onChange}));

  wrapper
    .find(Input)
    .props()
    .onChange({target: {valueAsNumber: now}});
  expect(onChange).not.toHaveBeenCalled();
});

test('<DateField> - renders a Input with correct error text (specified)', () => {
  const error = new Error();
  const element = <DateField name="x" error={error} showInlineError errorMessage="Error" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(FormHelperText).text()).toBe('Error');
});

test('<DateField> - renders a Input with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = <DateField name="x" error={error} showInlineError={false} errorMessage="Error" />;
  const wrapper = mount(element, createContext({x: {type: Date}}));

  expect(wrapper.find(FormHelperText)).toHaveLength(0);
});
