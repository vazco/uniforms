import React   from 'react';
import {mount} from 'enzyme';

import NumField from 'uniforms-bootstrap4/NumField';

import createContext from './_createContext';

test('<NumField> - renders an input', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
});

test('<NumField> - renders an input with correct disabled state', () => {
    const element = <NumField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('disabled')).toBe(true);
});

test('<NumField> - renders an input with correct id (inherited)', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('id')).toBeTruthy();
});

test('<NumField> - renders an input with correct id (specified)', () => {
    const element = <NumField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('id')).toBe('y');
});

test('<NumField> - renders an input with correct max', () => {
    const element = <NumField name="x" max={10} />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('max')).toBe(10);
});

test('<NumField> - renders an input with correct min', () => {
    const element = <NumField name="x" min={10} />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('min')).toBe(10);
});

test('<NumField> - renders an input with correct name', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('name')).toBe('x');
});

test('<NumField> - renders an input with correct placeholder', () => {
    const element = <NumField name="x" placeholder="y" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('placeholder')).toBe('y');
});

test('<NumField> - renders an input with correct step (decimal)', () => {
    const element = <NumField name="x" decimal />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('step')).toBe(0.01);
});

test('<NumField> - renders an input with correct step (integer)', () => {
    const element = <NumField name="x" decimal={false} />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('step')).toBe(1);
});

test('<NumField> - renders an input with correct type', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('type')).toBe('number');
});

test('<NumField> - renders an input with correct value (default)', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('value')).toBe('');
});

test('<NumField> - renders an input with correct value (model)', () => {
    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: '1'}}));

    expect(wrapper.find('input')).toHaveLength(1);
    // TODO: Check out NumField comment.
    expect(wrapper.find('input').prop('value')).toBe('1');

    // TODO: All following tests are here to cover hacky NumField implementation.
    expect(wrapper.find('input').simulate('change', {target: {value: '0.1'}})).toBeTruthy();
    wrapper.setProps({value: '0.1'});
    expect(wrapper.find('input').prop('value')).toBe('0.1');
    wrapper.setProps({value: undefined});
    expect(wrapper.find('input').prop('value')).toBe('');
    wrapper.setProps({value: undefined});
    expect(wrapper.find('input').prop('value')).toBe('');
    wrapper.setProps({value: 2});
    expect(wrapper.find('input').prop('value')).toBe('2');
    wrapper.setProps({value: 2});
    expect(wrapper.find('input').prop('value')).toBe('2');
    wrapper.setProps({value: 1, decimal: false});
    expect(wrapper.find('input').prop('value')).toBe('1');
    wrapper.setProps({value: 1, decimal: false});
    expect(wrapper.find('input').prop('value')).toBe('1');
});

test('<NumField> - renders an input with correct value (specified)', () => {
    const element = <NumField name="x" value={2} />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('input')).toHaveLength(1);
    // TODO: Check out NumField comment.
    expect(wrapper.find('input').prop('value')).toBe('2');
});

test('<NumField> - renders an input which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    // TODO: Check out NumField comment.
    expect(wrapper.find('input').simulate('change', {target: {value: '1'}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders an input which correctly reacts on change (decimal on decimal)', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" decimal />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').simulate('change', {target: {value: '2.5'}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 2.5);
});

test('<NumField> - renders an input which correctly reacts on change (decimal on integer)', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" decimal={false} />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').simulate('change', {target: {value: '2.5'}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 2);
});

test('<NumField> - renders an input which correctly reacts on change (empty)', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').simulate('change', {target: {value: ''}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<NumField> - renders an input which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {model: {x: 1}, onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    // TODO: Check out NumField comment.
    expect(wrapper.find('input').simulate('change', {target: {value: '1'}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 1);
});

test('<NumField> - renders an input which correctly reacts on change (zero)', () => {
    const onChange = jest.fn();

    const element = <NumField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(1);
    // TODO: Check out NumField comment.
    expect(wrapper.find('input').simulate('change', {target: {value: '0'}})).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 0);
});

test('<NumField> - renders a label', () => {
    const element = <NumField name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toBe('y');
    expect(wrapper.find('label').prop('htmlFor')).toBe(wrapper.find('input').prop('id'));
});

test('<NumField> - renders a wrapper with unknown props', () => {
    const element = <NumField name="x" data-x="x" data-y="y" data-z="z" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
    expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
    expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});
