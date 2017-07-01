import React   from 'react';
import {mount} from 'enzyme';

import SubmitField from 'uniforms-material/SubmitField';

import createContext from './_createContext';

test('<SubmitField> - renders', () => {
    const element = <SubmitField />;
    const wrapper = mount(element, createContext());

    expect(wrapper).toHaveLength(1);
});

test('<SubmitField> - renders SubmitField with correct disabled state', () => {
    const element = <SubmitField disabled />;
    const wrapper = mount(element, createContext());

    expect(wrapper.children().first().prop('disabled')).toBe(true);
});

test('<SubmitField> - renders SubmitField with correct disabled state when error (context)', () => {
    const error = new Error();
    const element = <SubmitField />;
    const wrapper = mount(element, createContext({}, {error}));

    expect(wrapper.children().first().prop('disabled')).toBe(true);
});
