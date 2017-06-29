import React   from 'react';
import {mount} from 'enzyme';

import Subheader           from 'material-ui/Subheader';
import SelectFieldMaterial from 'material-ui/SelectField';
import CheckboxMaterial    from 'material-ui/Checkbox';
import RadioButtonMaterial from 'material-ui/RadioButton';
// import MenuItem            from 'material-ui/MenuItem';

import SelectField from 'uniforms-material/SelectField';

import createContext from './_createContext';
import touchTap from './_touchTap';

test('<SelectField> - renders a select', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
});

test('<SelectField> - renders a select with correct disabled state', () => {
    const element = <SelectField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a select with correct id (inherited)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('id')).toBeTruthy();
});

test('<SelectField> - renders a select with correct id (specified)', () => {
    const element = <SelectField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('id')).toBe('y');
});

test('<SelectField> - renders a select with correct name', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('name')).toBe('x');
});

// TODO: Remove this ?
// test('<SelectField> - renders a select with correct options', () => {
//     const element = <SelectField name="x" />;
//     const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

//     expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem)).toHaveLength(2);
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(0).prop('value')).toBe('a');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(0).text()).toBe('a');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(1).prop('value')).toBe('b');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(1).text()).toBe('b');
// });

// TODO: Remove this ?
// test('<SelectField> - renders a select with correct options (transform)', () => {
//     const element = <SelectField name="x" transform={x => x.toUpperCase()} />;
//     const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

//     expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem)).toHaveLength(2);
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(0).prop('value')).toBe('a');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(0).text()).toBe('A');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(1).prop('value')).toBe('b');
//     expect(wrapper.find(SelectFieldMaterial).find(MenuItem).at(1).text()).toBe('B');
// });

// TODO: Remove this ?
// test('<SelectField> - renders a select with correct placeholder (fallback)', () => {
//     const element = <SelectField name="x" label="y" placeholder="" />;
//     const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b'], optional: true}}));

//     expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
//     expect(wrapper.find(SelectFieldMaterial).prop('hintText')).toBe('y');
// });

test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
    const element = <SelectField name="x" placeholder="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('hintText')).toBe('y');
});

test('<SelectField> - renders a select with correct value (default)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBeUndefined(); // TODO: Fix ?
});

test('<SelectField> - renders a select with correct value (model)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBe('b');
});

test('<SelectField> - renders a select with correct value (specified)', () => {
    const element = <SelectField name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBe('b');
});

test('<SelectField> - renders a select which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    wrapper.find(SelectFieldMaterial).props().onChange({}, 1, 'b');
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    wrapper.find(SelectFieldMaterial).props().onChange({}, -1, '');
    expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    wrapper.find(SelectFieldMaterial).props().onChange({}, 1, 'b');
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a label', () => {
    const element = <SelectField name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('floatingLabelText')).toBe('y');
});

test('<SelectField checkboxes> - renders a set of checkboxes', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
    const element = <SelectField checkboxes name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
    expect(wrapper.find('input').at(1).prop('disabled')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('id')).toBeTruthy();
    expect(wrapper.find('input').at(1).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
    const element = <SelectField checkboxes name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('id')).toBe('y-a');
    expect(wrapper.find('input').at(1).prop('id')).toBe('y-b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('input').at(0).prop('name')).toBe('x');
    expect(wrapper.find('input').at(1).prop('name')).toBe('x');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('label')).toBe('a');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('label')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {
    const element = <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('label')).toBe('A');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('label')).toBe('B');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(false);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
    const element = <SelectField checkboxes name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    touchTap(wrapper.find(RadioButtonMaterial).at(1));
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    touchTap(wrapper.find(CheckboxMaterial).at(1));
    expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" value={['b']} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    touchTap(wrapper.find(CheckboxMaterial).at(1));
    expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    touchTap(wrapper.find(RadioButtonMaterial).at(0));
    expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
    const element = <SelectField checkboxes name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(Subheader).at(0).text()).toBe('y');
});
