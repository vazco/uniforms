import CheckboxMaterial    from 'material-ui/Checkbox';
import RadioButtonMaterial from 'material-ui/RadioButton';
import React               from 'react';
import SelectFieldMaterial from 'material-ui/SelectField';
import Subheader           from 'material-ui/Subheader';
import {mount}             from 'enzyme';

import SelectField from 'uniforms-material/SelectField';

import createContext from './_createContext';

test('<SelectField> - renders a SelectField', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
});

test('<SelectField> - renders a SelectField with correct disabled state', () => {
    const element = <SelectField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a SelectField with correct id (inherited)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('id')).toBeTruthy();
});

test('<SelectField> - renders a SelectField with correct id (specified)', () => {
    const element = <SelectField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('id')).toBe('y');
});

test('<SelectField> - renders a SelectField with correct name', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('name')).toBe('x');
});

test('<SelectField> - renders a SelectField with correct options', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('children')).toHaveLength(2);
    expect(wrapper.find(SelectFieldMaterial).prop('children')[0].props.primaryText).toBe('a');
    expect(wrapper.find(SelectFieldMaterial).prop('children')[1].props.primaryText).toBe('b');
});

test('<SelectField> - renders a SelectField with correct options (transform)', () => {
    const element = <SelectField name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('children')).toHaveLength(2);
    expect(wrapper.find(SelectFieldMaterial).prop('children')[0].props.primaryText).toBe('A');
    expect(wrapper.find(SelectFieldMaterial).prop('children')[1].props.primaryText).toBe('B');
});

test('<SelectField> - renders a SelectField with correct placeholder (implicit)', () => {
    const element = <SelectField name="x" placeholder="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('hintText')).toBe('y');
});

test('<SelectField> - renders a SelectField with correct value (default)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBeUndefined();
});

test('<SelectField> - renders a SelectField with correct value (model)', () => {
    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBe('b');
});

test('<SelectField> - renders a SelectField with correct value (specified)', () => {
    const element = <SelectField name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    expect(wrapper.find(SelectFieldMaterial).prop('value')).toBe('b');
});

test('<SelectField> - renders a SelectField which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    wrapper.find(SelectFieldMaterial).props().onChange({}, 1, 'b');
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a SelectField which correctly reacts on change (empty)', () => {
    const onChange = jest.fn();

    const element = <SelectField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(SelectFieldMaterial)).toHaveLength(1);
    wrapper.find(SelectFieldMaterial).props().onChange({}, -1, '');
    expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<SelectField> - renders a SelectField which correctly reacts on change (same value)', () => {
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

test('<SelectField checkboxes> - renders a set of RadioButtons', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct disabled state', () => {
    const element = <SelectField checkboxes name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('disabled')).toBe(true);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('disabled')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct id (inherited)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('id')).toBeTruthy();
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('id')).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct id (specified)', () => {
    const element = <SelectField checkboxes name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('id')).toBe('y-a');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('id')).toBe('y-b');
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct name', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('name')).toBe('x');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('name')).toBe('x');
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct options', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('label')).toBe('a');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('label')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct options (transform)', () => {
    const element = <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('label')).toBe('A');
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('label')).toBe('B');
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct value (default)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(false);
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct value (model)', () => {
    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of RadioButtons with correct value (specified)', () => {
    const element = <SelectField checkboxes name="x" value="b" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    expect(wrapper.find(RadioButtonMaterial).at(0).prop('checked')).toBe(false);
    expect(wrapper.find(RadioButtonMaterial).at(1).prop('checked')).toBe(true);
});

test('<SelectField checkboxes> - renders a set of RadioButtons which correctly reacts on change', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {onChange}));

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    wrapper.find(RadioButtonMaterial).at(1).find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array check)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    wrapper.find(CheckboxMaterial).at(1).find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correctly reacts on change (array uncheck)', () => { // eslint-disable-line max-len
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" value={['b']} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    wrapper.find(CheckboxMaterial).at(1).find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correct labels', () => { // eslint-disable-line max-len
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    expect(wrapper.find(CheckboxMaterial).at(0).prop('label')).toBe('a');
    expect(wrapper.find(CheckboxMaterial).at(1).prop('label')).toBe('b');
});

test('<SelectField checkboxes> - renders a set of Checkboxes which correct labels', () => { // eslint-disable-line max-len
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String, allowedValues: ['a', 'b']}}, {onChange})); // eslint-disable-line max-len

    expect(wrapper.find(CheckboxMaterial)).toHaveLength(2);
    expect(wrapper.find(CheckboxMaterial).at(0).prop('label')).toBe('A');
    expect(wrapper.find(CheckboxMaterial).at(1).prop('label')).toBe('B');
});

test('<SelectField checkboxes> - renders a set of RadioButtons which correctly reacts on change (same value)', () => {
    const onChange = jest.fn();

    const element = <SelectField checkboxes name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}, {model: {x: 'b'}, onChange})); // eslint-disable-line max-len

    expect(wrapper.find(RadioButtonMaterial)).toHaveLength(2);
    wrapper.find(RadioButtonMaterial).at(0).find('input').simulate('change');
    expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
    const element = <SelectField checkboxes name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(Subheader).at(0).text()).toBe('y');
});

test('<SelectField> - renders a SelectField with correct error text (specified)', () => {
    const error = new Error();
    const element = <SelectField name="x" error={error} showInlineError errorMessage="Error" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial).prop('errorText')).toBe('Error');
});

test('<SelectField> - renders a SelectField with correct error text (showInlineError=false)', () => {
    const error = new Error();
    const element = <SelectField name="x" error={error} showInlineError={false} errorMessage="Error" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['a', 'b']}}));

    expect(wrapper.find(SelectFieldMaterial).prop('errorText')).toBeUndefined();
});
