import React   from 'react';
import {mount} from 'enzyme';

import SubmitField from 'uniforms-unstyled/SubmitField';

import createContext from './_createContext';

test('<SubmitField> - renders', () => {
    const element = <SubmitField />;
    const wrapper = mount(element, createContext());

    expect(wrapper).toHaveLength(1);
});
