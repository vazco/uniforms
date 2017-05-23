import React   from 'react';
import {mount} from 'enzyme';

import SubmitField from 'uniforms-material/SubmitField';

import createContext from './_createContext';

test('<SubmitField> - renders', () => {
    const element = <SubmitField />;
    const wrapper = mount(element, createContext());

    expect(wrapper).toHaveLength(1);
});
