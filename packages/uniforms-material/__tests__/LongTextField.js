import React from 'react';
import TextField from '@material-ui/core/TextField';
import { mount } from 'enzyme';

import LongTextField from 'uniforms-material/LongTextField';
import createContext from './_createContext';

test('<LongTextField> - renders a TextField', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
});

test('<LongTextField> - renders a TextField with correct disabled state', () => {
  const element = <LongTextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('disabled')).toBe(true);
});

test('<LongTextField> - renders a TextField with correct id (inherited)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBeTruthy();
});

test('<LongTextField> - renders a TextField with correct id (specified)', () => {
  const element = <LongTextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('id')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct name', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('name')).toBe('x');
});

test('<LongTextField> - renders a TextField with correct placeholder', () => {
  const element = <LongTextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('placeholder')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct value (default)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('');
});

test('<LongTextField> - renders a TextField with correct value (model)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } })
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct value (specified)', () => {
  const element = <LongTextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField)).toHaveLength(1);
  expect(wrapper.find(TextField).prop('value')).toBe('y');
});

test('<LongTextField> - renders a TextField which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange })
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a TextField which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange })
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({ target: { value: '' } });
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<LongTextField> - renders a TextField which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange })
  );

  expect(wrapper.find(TextField)).toHaveLength(1);
  wrapper
    .find(TextField)
    .props()
    .onChange({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a label', () => {
  const element = <LongTextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('label')).toBe('y');
});

test('<LongTextField> - renders a TextField with correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <LongTextField
      name="x"
      error={error}
      showInlineError
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('helperText')).toBe('Error');
});

test('<LongTextField> - renders a TextField with correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <LongTextField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(TextField).prop('helperText')).toBeUndefined();
});
