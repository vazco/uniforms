import React   from 'react';
import {mount} from 'enzyme';

import ErrorField from 'uniforms-material/ErrorField';

import createContext from './_createContext';

const error = {
    error: 'validation-error',
    reason: 'X is required',
    details: [{name: 'x', type: 'required', details: {value: null}}],
    message: 'X is required [validation-error]'
};

test('<ErrorField> - works', () => {
    const element = <ErrorField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}}));

    expect(wrapper.find(ErrorField)).toHaveLength(1);
});

test('<ErrorField> - renders correct error message (context)', () => {
    const element = <ErrorField name="x" />;
    const wrapper = mount(element, createContext({x: {type: String}}, {error}));

    expect(wrapper.find(ErrorField)).toHaveLength(1);
    expect(wrapper.find(ErrorField).text()).toBe('X is required');
});

test('<ErrorField> - renders correct error message (specified)', () => {
    const element = <ErrorField name="x" error={error.details[0]} errorMessage="X is required" />;
    const wrapper = mount(element, createContext({x: {type: String}}));

    expect(wrapper.find(ErrorField)).toHaveLength(1);
    expect(wrapper.find(ErrorField).text()).toBe('X is required');
});
