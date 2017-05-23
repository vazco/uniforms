import React   from 'react';
import {mount} from 'enzyme';

import AutoField   from 'uniforms-material/AutoField';
import BoolField   from 'uniforms-material/BoolField';
import DateField   from 'uniforms-material/DateField';
import ListField   from 'uniforms-material/ListField';
import NestField   from 'uniforms-material/NestField';
import NumField    from 'uniforms-material/NumField';
import RadioField  from 'uniforms-material/RadioField';
import SelectField from 'uniforms-material/SelectField';
import TextField   from 'uniforms-material/TextField';

import createContext from './_createContext';

test('<AutoField> - works', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}}));

    expect(wrapper.find(AutoField)).toHaveLength(1);
});

test('<AutoField> - renders RadioField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String, allowedValues: ['x', 'y'], uniforms: {checkboxes: true}}})); // eslint-disable-line max-len

    expect(wrapper.find(RadioField)).toHaveLength(1);
});

test('<AutoField> - renders SelectField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array, allowedValues: ['x', 'y']}, 'x.$': {type: String}}));

    expect(wrapper.find(SelectField)).toHaveLength(1);
});

test('<AutoField> - renders DateField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Date}}));

    expect(wrapper.find(DateField)).toHaveLength(1);
});

test('<AutoField> - renders ListField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListField)).toHaveLength(1);
});

test('<AutoField> - renders NumField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Number}}));

    expect(wrapper.find(NumField)).toHaveLength(1);
});

test('<AutoField> - renders NestField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Object}}));

    expect(wrapper.find(NestField)).toHaveLength(1);
});

test('<AutoField> - renders TextField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}}));

    expect(wrapper.find(TextField)).toHaveLength(1);
});

test('<AutoField> - renders BoolField', () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Boolean}}));

    expect(wrapper.find(BoolField)).toHaveLength(1);
});

test('<AutoField> - renders Component (model)', () => {
    const Component = jest.fn(() => null);

    const element = <AutoField name="x" />;
    mount(element, createContext({x: {type: String, uniforms: {component: Component}}}));

    expect(Component).toHaveBeenCalledTimes(1);
});

test('<AutoField> - renders Component (specified)', () => {
    const Component = jest.fn(() => null);

    const element = <AutoField name="x" component={Component} />;
    mount(element, createContext({x: {type: String}}));

    expect(Component).toHaveBeenCalledTimes(1);
});
