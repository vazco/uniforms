import React      from 'react';
import {ListItem} from 'material-ui/List';
import {mount}    from 'enzyme';

import ErrorsField from 'uniforms-material/ErrorsField';

import createContext from './_createContext';

const error = {
    error: 'validation-error',
    reason: 'X is required',
    details:[
        {name: 'x', type: 'required', details: {value: null}},
        {name: 'y', type: 'required', details: {value: null}},
        {name: 'z', type: 'required', details: {value: null}}
    ],
    message: 'X is required [validation-error]'
};

test('<ErrorsField> - works', () => {
    const element = <ErrorsField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}}));

    expect(wrapper.find(ErrorsField)).toHaveLength(1);
});

test('<ErrorsField> - renders list of correct error messages (context)', () => {
    const element = <ErrorsField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}, y: {type: String}, z: {type: String}}, {error}));

    expect(wrapper.find(ListItem)).toHaveLength(3);
    expect(wrapper.find(ListItem).at(0).text()).toBe('X is required');
    expect(wrapper.find(ListItem).at(1).text()).toBe('Y is required');
    expect(wrapper.find(ListItem).at(2).text()).toBe('Z is required');
});

test('<ErrorsField> - renders children (specified)', () => {
    const element = <ErrorsField name="x" children="Error message list" />;
    const wrapper = mount(element, createContext({x: {type: String}, y: {type: String}, z: {type: String}}, {error}));

    expect(wrapper.find(ErrorsField).text()).toEqual(expect.stringContaining('Error message list'));
});
