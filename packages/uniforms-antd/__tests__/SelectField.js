import Radio    from 'antd/lib/radio';
import React    from 'react';
import Select   from 'antd/lib/select';
import {mount}  from 'enzyme';

import SelectField from 'uniforms-antd/SelectField';

import createContext from './_createContext';

test('<SelectField> - renders a select', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
});

test('<SelectField> - renders a select with correct disabled state', () => {
    const element = <SelectField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a select with correct id (inherited)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('id')).toBeTruthy();
});

test('<SelectField> - renders a select with correct id (specified)', () => {
    const element = <SelectField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('id')).toBe('y');
});

test('<SelectField> - renders a select with correct name', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('name')).toBe('x');
});

test('<SelectField> - renders a select with correct options', () => {
    const element = <SelectField name="x" open />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('children')).toHaveLength(2);
    expect(wrapper.find(Select).prop('children')[0].props.value).toBe('a');
    expect(wrapper.find(Select).prop('children')[0].props.children).toBe('a');
    expect(wrapper.find(Select).prop('children')[1].props.value).toBe('b');
    expect(wrapper.find(Select).prop('children')[1].props.children).toBe('b');
});

test('<SelectField> - renders a select with correct options (transform)', () => {
    const element = <SelectField name="x" open transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('children')).toHaveLength(2);
    expect(wrapper.find(Select).prop('children')[0].props.value).toBe('a');
    expect(wrapper.find(Select).prop('children')[0].props.children).toBe('A');
    expect(wrapper.find(Select).prop('children')[1].props.value).toBe('b');
    expect(wrapper.find(Select).prop('children')[1].props.children).toBe('B');
});

test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
    const element = <SelectField name="x" placeholder="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('placeholder')).toBe('y');
});

test('<SelectField> - renders a select with correct value (default)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('value')).toBe('');
});

test('<SelectField> - renders a select with correct value (model)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('value')).toBe('b');
});

test('<SelectField> - renders a select with correct value (specified)', () => {
    const element = <SelectField name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('value')).toBe('b');
});

test('<SelectField> - renders a select which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('onChange')('b')).toBeFalsy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a select which correctly reacts on change (array)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" value={undefined} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('onChange')(['b'])).toBeFalsy();
    expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('onChange')('')).toBeFalsy();
    expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select).prop('onChange')('b')).toBeFalsy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a wrapper with unknown props', () => {
    const element = <SelectField name="x" data-x="x" data-y="y" data-z="z" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Select).prop('data-x')).toBe('x');
    expect(wrapper.find(Select).prop('data-y')).toBe('y');
    expect(wrapper.find(Select).prop('data-z')).toBe('z');
});

test('<SelectField checkboxes> - renders a set of checkboxes', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio)).toHaveLength(2);
    expect(wrapper.find(Radio).at(0).prop('value')).toBe('a');
    expect(wrapper.find(Radio).at(1).prop('value')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
    const element = <SelectField checkboxes name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio.Group)).toHaveLength(1);
    expect(wrapper.find(Radio.Group).prop('disabled')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio.Group)).toHaveLength(1);
    expect(wrapper.find(Radio.Group).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
    const element = <SelectField checkboxes name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio.Group)).toHaveLength(1);
    expect(wrapper.find(Radio.Group).prop('id')).toBe('y');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio.Group)).toHaveLength(1);
    expect(wrapper.find(Radio.Group).prop('name')).toBe('x');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('label').at(0).text()).toBe('a');
    expect(wrapper.find('label').at(1).text()).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {
    const element = <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('label').at(0).text()).toBe('A');
    expect(wrapper.find('label').at(1).text()).toBe('B');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
    expect(wrapper.find('input').at(1).prop('checked')).toBe(false);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
    expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
    const element = <SelectField checkboxes name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('checked')).toBe(false);
    expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" value={['b']} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(1).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).simulate('change')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
    const element = <SelectField checkboxes name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(3);
    expect(wrapper.find('label').at(0).text()).toBe('y');
});

test('<SelectField checkboxes> - renders a wrapper with unknown props', () => {
    const element = <SelectField checkboxes name="x" data-x="x" data-y="y" data-z="z" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Radio.Group).prop('data-x')).toBe('x');
    expect(wrapper.find(Radio.Group).prop('data-y')).toBe('y');
    expect(wrapper.find(Radio.Group).prop('data-z')).toBe('z');
});
