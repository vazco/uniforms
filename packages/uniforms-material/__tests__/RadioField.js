import React              from 'react';
import Subheader          from 'material-ui/Subheader';
import {RadioButtonGroup} from 'material-ui/RadioButton';
import {RadioButton}      from 'material-ui/RadioButton';
import {mount}            from 'enzyme';

import RadioField from 'uniforms-material/RadioField';

import createContext from './_createContext';

test('<RadioField> - renders a set of RadioButtons', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButton)).toHaveLength(2);
});

test('<RadioField> - renders a set of RadioButtons wrapped with RadioButtonGroup', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).find(RadioButton)).toHaveLength(2);
});

test('<RadioField> - renders a set of RadioButtons with correct disabled state', () => {
    const element = <RadioField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButton)).toHaveLength(2);
    expect(wrapper.find(RadioButton).at(0).prop('disabled')).toBe(true);
    expect(wrapper.find(RadioButton).at(1).prop('disabled')).toBe(true);
    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('disabled')).toBe(true);
});

test('<RadioField> - renders a RadioButtonGroup with correct id (inherited)', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('id')).toBeTruthy();
});

test('<RadioField> - renders a RadioButtonGroup with correct id (specified)', () => {
    const element = <RadioField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('id')).toBe('y');
});

test('<RadioField> - renders a RadioButtonGroup with correct name', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('name')).toBe('x');
});

test('<RadioField> - renders a set of RadioButtons with correct options', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButton)).toHaveLength(2);
    expect(wrapper.find(RadioButton).at(0).prop('label')).toBe('a');
    expect(wrapper.find(RadioButton).at(1).prop('label')).toBe('b');
});

test('<RadioField> - renders a set of RadioButtons with correct options (transform)', () => {
    const element = <RadioField name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButton)).toHaveLength(2);
    expect(wrapper.find(RadioButton).at(0).prop('label')).toBe('A');
    expect(wrapper.find(RadioButton).at(1).prop('label')).toBe('B');
});

test('<RadioField> - renders a RadioButtonGroup with correct value (default)', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('valueSelected')).toBeFalsy();
});

test('<RadioField> - renders a RadioButtonGroup with correct value (model)', () => {
    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('valueSelected')).toBe('b');
});

test('<RadioField> - renders a RadioButtonGroup with correct value (specified)', () => {
    const element = <RadioField name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find(RadioButtonGroup).prop('valueSelected')).toBe('b');
});

test('<RadioField> - renders a RadioButtonGroup which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<RadioField> - renders a RadioButtonGroup which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <RadioField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    expect(wrapper.find('input').at(0).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<RadioField> - renders a label', () => {
    const element = <RadioField name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(Subheader).at(0).text()).toBe('y');
});
