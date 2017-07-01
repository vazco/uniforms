import React     from 'react';
import Subheader from 'material-ui/Subheader';
import {mount}   from 'enzyme';

import ListAddField  from 'uniforms-material/ListAddField';
import ListField     from 'uniforms-material/ListField';
import ListItemField from 'uniforms-material/ListItemField';

import createContext from './_createContext';

test('<ListField> - works', () => {
    const element = <ListField name="x" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListField)).toHaveLength(1);
});

test('<ListField> - renders ListAddField', () => {
    const element = <ListField name="x" label="ListFieldLabel" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListAddField)).toHaveLength(1);
    expect(wrapper.find(ListAddField).prop('name')).toBe('x.$');
});

test('<ListField> - renders correct label (specified)', () => {
    const element = <ListField name="x" label="ListFieldLabel" />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(Subheader).at(0).text()).toBe('ListFieldLabel');
});

test('<ListField> - renders correct number of items with initialCount (specified)', () => {
    const element = <ListField name="x" initialCount={3} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListItemField)).toHaveLength(3);
});

test('<ListField> - passes itemProps to its children', () => {
    const element = <ListField name="x" initialCount={3} itemProps={{'data-xyz': 1}} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListItemField).first().prop('data-xyz')).toBe(1);
});

test('<ListField> - renders children (specified)', () => {
    const Child = jest.fn(() => null);

    const element = <ListField name="x" initialCount={2}><Child /></ListField>;
    mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(Child).toHaveBeenCalledTimes(2);
});

test('<ListField> - renders children with correct name (children)', () => {
    const Child = jest.fn(() => <div />);

    const element = <ListField name="x" initialCount={2}><Child name="$" /></ListField>;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(Child).at(0).prop('name')).toBe('x.0');
    expect(wrapper.find(Child).at(1).prop('name')).toBe('x.1');
});

test('<ListField> - renders children with correct name (value)', () => {
    const element = <ListField name="x" initialCount={2} />;
    const wrapper = mount(element, createContext({x: {type: Array}, 'x.$': {type: String}}));

    expect(wrapper.find(ListItemField).at(0).prop('name')).toBe('x.0');
    expect(wrapper.find(ListItemField).at(1).prop('name')).toBe('x.1');
});
