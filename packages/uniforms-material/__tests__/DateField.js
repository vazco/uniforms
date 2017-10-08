import DatePicker from 'material-ui/DatePicker';
import React      from 'react';
import TextField  from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {mount}    from 'enzyme';

import DateField from 'uniforms-material/DateField';

import createContext from './_createContext';

test('<DateField> - renders TextField, DatePicker and TimePicker', () => {
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
});

test('<DateField> - renders a TextField with correct id (inherited)', () => {
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('id')).toBeTruthy();
});

test('<DateField> - renders a TextField with correct id (specified)', () => {
    const element = <DateField name="x" id="y" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('id')).toBe('y');
});

test('<DateField> - renders a TextField with correct name', () => {
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('name')).toBe('x');
});

test('<DateField> - renders an TextField with correct disabled state', () => {
    const element = <DateField name="x" disabled />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('disabled')).toBe(true);
});

test('<DateField> - renders a TextField with correct label (specified)', () => {
    const element = <DateField name="x" label="DateFieldLabel" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('floatingLabelText')).toBe('DateFieldLabel');
});

test('<DateField> - renders a TextField with correct value (default)', () => {
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('value')).toBe('');
});

test('<DateField> - renders a TextField with correct value (model)', () => {
    const now = new Date();
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}, {model: {x: now}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('value')).toEqual(now.toLocaleString());
});

test('<DateField> - renders a TextField with correct value (specified)', () => {
    const now = new Date();
    const element = <DateField name="x" value={now} />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    expect(wrapper.find(TextField).at(0).prop('value')).toEqual(now.toLocaleString());
});

test('<DateField> - renders TextField which correctly react on focus', async () => {
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(DatePicker).find('Dialog').prop('open')).toBe(false);
    wrapper.find(TextField).at(0).props().onFocus();

    // Make sure, that DateField#onFocus will finish.
    await new Promise(resolve => setTimeout(resolve, 100));

    wrapper.update();

    expect(wrapper.find(DatePicker).find('Dialog').prop('open')).toBe(true);
});

test('<DateField> - renders a TextField which correctly reacts on change', () => {
    const onChange = jest.fn();

    const now = new Date();
    const element = <DateField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}, {onChange}));

    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
    wrapper.find(DatePicker).props().onChange({}, now);
    wrapper.find(TimePicker).props().onChange({}, now);
    expect(onChange).toHaveBeenLastCalledWith('x', now);
});

test('<DateField> - renders a TextField with correct error text (specified)', () => {
    const error = new Error();
    const element = <DateField name="x" error={error} showInlineError errorMessage="Error" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField).at(0).prop('errorText')).toBe('Error');
});

test('<DateField> - renders a TextField with correct error text (showInlineError=false)', () => {
    const error = new Error();
    const element = <DateField name="x" error={error} showInlineError={false} errorMessage="Error" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(TextField).at(0).prop('errorText')).toBeUndefined();
});
