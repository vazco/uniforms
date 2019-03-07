import React from 'react';
import TextField from '@material-ui/core/TextField';
import {mount} from 'enzyme';

import NumField from 'uniforms-material/NumField';

import createContext from './_createContext';

test('<NumField> - renders a TextField', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
});

test('<NumField> - renders a TextField with correct disabled state', () => {
  const element = <NumField name="x" disabled />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('disabled')).toBe(true);
});

test('<NumField> - renders a TextField with correct id (inherited)', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBeTruthy();
});

test('<NumField> - renders a TextField with correct id (specified)', () => {
  const element = <NumField name="x" id="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBe('y');
});

test('<NumField> - renders a TextField with correct max', () => {
  const element = <NumField name="x" max={10} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find('input').prop('max')).toBe(10);
});

test('<NumField> - renders a TextField with correct min', () => {
  const element = <NumField name="x" min={10} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find('input').prop('min')).toBe(10);
});

test('<NumField> - renders a TextField with correct name', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('name')).toBe('x');
});

test('<NumField> - renders a TextField with correct placeholder', () => {
  const element = <NumField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('placeholder')).toBe('y');
});

test('<NumField> - renders a TextField with correct step (decimal)', () => {
  const element = <NumField name="x" decimal />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find('input').prop('step')).toBe(0.01);
});

test('<NumField> - renders a TextField with correct step (integer)', () => {
  const element = <NumField name="x" decimal={false} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find('input').prop('step')).toBe(1);
});

test('<NumField> - renders a TextField with correct type', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('type')).toBe('number');
});

test('<NumField> - renders a TextField with correct value (default)', () => {
  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('');
});

test('<NumField> - renders a TextField with correct value (model)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: 1}, onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('1');

  // NOTE: All following tests are here to cover hacky NumField implementation.
  const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

  [
    {value: 0.1},
    {value: undefined},
    {value: undefined},
    {value: 2},
    {value: 2},
    {value: 1, decimal: false},
    {value: 1, decimal: false}
  ].forEach(({decimal = true, value}) => {
    const valueInput = value === undefined ? '' : '' + value;

    wrapper.setProps({decimal});

    expect(wrapper.find('input').simulate('change', {target: {value: ''}})).toBeTruthy();
    expect(wrapper.find('input').simulate('change', {target: {value: valueInput}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', value);

    wrapper.setProps({value: undefined});
    wrapper.setProps({value});
    expect(wrapper.find('input').prop('value')).toBe(valueInput);
  });

  spy.mockRestore();
});

test('<NumField> - renders a TextField with correct value (specified)', () => {
  const element = <NumField name="x" value={2} />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('2');
});

test('<NumField> - renders a TextField which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: '1'}});
  expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders a TextField which correctly reacts on change (decimal on decimal)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" decimal />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: '2.5'}});
  expect(onChange).toHaveBeenLastCalledWith('x', 2.5);
});

test('<NumField> - renders a TextField which correctly reacts on change (decimal on integer)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" decimal={false} />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: '2.5'}});
  expect(onChange).toHaveBeenLastCalledWith('x', 2);
});

test('<NumField> - renders a TextField which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: ''}});
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<NumField> - renders a TextField which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: 1}, onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: '1'}});
  expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders a TextField which correctly reacts on change (zero)', () => {
  const onChange = jest.fn();

  const element = <NumField name="x" />;
  const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({target: {value: '0'}});
  expect(onChange).toHaveBeenLastCalledWith('x', 0);
});

test('<NumField> - renders a label', () => {
  const element = <NumField name="x" label="y" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('label')).toBe('y');
});

test('<NumField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = <NumField name="x" error={error} showInlineError errorMessage="Error" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField).prop('helperText')).toBe('Error');
});

test('<NumField> - renders a TextField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = <NumField name="x" error={error} showInlineError={false} errorMessage="Error" />;
  const wrapper = mount(element, createContext({x: {type: Number}}));

  expect(wrapper.find(TextField).prop('helperText')).toBeUndefined();
});
