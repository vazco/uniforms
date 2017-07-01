import Checkbox from 'material-ui/Checkbox';
import React    from 'react';
import Toggle   from 'material-ui/Toggle';
import {mount}  from 'enzyme';

import BoolField from 'uniforms-material/BoolField';

import createContext from './_createContext';

test('<BoolField> - renders an Checkbox', () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
});

test('<BoolField> - renders a Checkbox with correct id (inherited)', () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a Checkbox with correct id (specified)', () => {
    const element = <BoolField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('id')).toBe('y');
});

test('<BoolField> - renders a Checkbox with correct name', () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('name')).toBe('x');
});

test('<BoolField> - renders an Checkbox with correct disabled state', () => {
    const element = <BoolField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a Checkbox with correct label (specified)', () => {
    const element = <BoolField name="x" label="BoolFieldLabel" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('label')).toBe('BoolFieldLabel');
});

test('<BoolField> - renders a Checkbox with correct value (default)', () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('checked')).toBe(false);
});

test('<BoolField> - renders a Checkbox with correct value (model)', () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}, {model: {x: true}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Checkbox with correct value (specified)', () => {
    const element = <BoolField name="x" value />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a Checkbox which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}, {onChange}));

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', false);
});

test('<BoolField> - renders an Toggle', () => {
    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
});

test('<BoolField> - renders a Toggle with correct id (inherited)', () => {
    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a Toggle with correct id (specified)', () => {
    const element = <BoolField name="x" appearance="toggle" id="y" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('id')).toBe('y');
});

test('<BoolField> - renders a Toggle with correct name', () => {
    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('name')).toBe('x');
});

test('<BoolField> - renders an Toggle with correct disabled state', () => {
    const element = <BoolField name="x" appearance="toggle" disabled />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a Toggle with correct label (specified)', () => {
    const element = <BoolField name="x" appearance="toggle" label="BoolFieldLabel" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('label')).toBe('BoolFieldLabel');
});

test('<BoolField> - renders a Toggle with correct value (default)', () => {
    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('toggled')).toBe(false);
});

test('<BoolField> - renders a Toggle with correct value (model)', () => {
    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}, {model: {x: true}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('toggled')).toBe(true);
});

test('<BoolField> - renders a Toggle with correct value (specified)', () => {
    const element = <BoolField name="x" appearance="toggle" value />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    expect(wrapper.find(Toggle).prop('toggled')).toBe(true);
});

test('<BoolField> - renders a Toggle which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <BoolField name="x" appearance="toggle" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}, {onChange}));

    expect(wrapper.find(Toggle)).toHaveLength(1);
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', false);
});
