import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import { BoolField } from 'uniforms-material';

import createContext from './_createContext';
import mount from './_mount';

test('<BoolField> - renders an Checkbox', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
});

test('<BoolField> - renders a Checkbox with correct id (inherited)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a Checkbox with correct id (specified)', () => {
  const element = <BoolField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('id')).toBe('y');
});

test('<BoolField> - renders a Checkbox with correct name', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('name')).toBe('x');
});

test('<BoolField> - renders an Checkbox with correct disabled state', () => {
  const element = <BoolField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a Checkbox with correct label (specified)', () => {
  const element = <BoolField name="x" label="BoolFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(FormControlLabel).prop('label')).toBe('BoolFieldLabel');
});

test('<BoolField> - renders a Checkbox with correct value (default)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(false);
});

test('<BoolField> - renders a Checkbox with correct value (model)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Checkbox with correct value (specified)', () => {
  const element = <BoolField name="x" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Checkbox which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find(Checkbox)).toHaveLength(1);
  wrapper.find('input').simulate('change');
  expect(onChange).toHaveBeenLastCalledWith('x', false);
});

test('<BoolField> - renders an Switch', () => {
  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
});

test('<BoolField> - renders a Switch with correct id (inherited)', () => {
  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a Switch with correct id (specified)', () => {
  const element = <BoolField name="x" appearance="switch" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('id')).toBe('y');
});

test('<BoolField> - renders a Switch with correct name', () => {
  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('name')).toBe('x');
});

test('<BoolField> - renders an Switch with correct disabled state', () => {
  const element = <BoolField name="x" appearance="switch" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a Switch with correct label (specified)', () => {
  const element = (
    <BoolField name="x" appearance="switch" label="BoolFieldLabel" />
  );
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(FormControlLabel).prop('label')).toBe('BoolFieldLabel');
});

test('<BoolField> - renders a Switch with correct label (transform)', () => {
  const element = (
    <BoolField
      name="x"
      appearance="switch"
      label="BoolFieldLabel"
      transform={x => x.toUpperCase()}
    />
  );
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(FormControlLabel).prop('label')).toBe('BOOLFIELDLABEL');
});

test('<BoolField> - renders a Switch with correct legend (specified)', () => {
  const element = (
    <BoolField name="x" appearance="switch" legend="BoolFieldLegend" />
  );
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(FormLabel).text()).toBe('BoolFieldLegend *');
});

test('<BoolField> - renders a Switch with correct value (default)', () => {
  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(false);
});

test('<BoolField> - renders a Switch with correct value (model)', () => {
  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Switch with correct value (specified)', () => {
  const element = <BoolField name="x" appearance="switch" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(Switch)).toHaveLength(1);
  expect(wrapper.find(Switch).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Switch which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" appearance="switch" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  expect(wrapper.find(Switch)).toHaveLength(1);
  wrapper.find('input').simulate('change');
  expect(onChange).toHaveBeenLastCalledWith('x', false);
});

test('<BoolField> - renders a helperText', () => {
  const element = <BoolField name="x" helperText="Helper" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(FormHelperText)).toHaveLength(1);
  expect(wrapper.find(FormHelperText).text()).toBe('Helper');
});
