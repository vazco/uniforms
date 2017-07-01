import React     from 'react';
import Subheader from 'material-ui/Subheader';
import {mount}   from 'enzyme';

import AutoField from 'uniforms-material/AutoField';
import NestField from 'uniforms-material/NestField';

import createContext from './_createContext';

test('<NestField> - renders an <AutoField> for each field', () => {
    const element = <NestField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Object}, 'x.a': {type: String}, 'x.b': {type: Number}}));

    expect(wrapper.find(AutoField)).toHaveLength(2);
    expect(wrapper.find(AutoField).at(0).prop('name')).toBe('x.a');
    expect(wrapper.find(AutoField).at(1).prop('name')).toBe('x.b');
});

test('<NestField> - renders custom content if given', () => {
    const element = <NestField name="x"><article data-test="content" /></NestField>;
    const wrapper = mount(element, createContext({x: {type: Object}, 'x.a': {type: String}, 'x.b': {type: Number}}));

    expect(wrapper.find(AutoField)).toHaveLength(0);
    expect(wrapper.find('article')).toHaveLength(1);
    expect(wrapper.find('article').prop('data-test')).toBe('content');
});

test('<NestField> - renders a Subheader', () => {
    const element = <NestField name="x" label="y" />;
    const wrapper = mount(element, createContext({x: {type: Object}, 'x.a': {type: String}, 'x.b': {type: Number}}));

    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(Subheader).at(0).text()).toBe('y');
});
