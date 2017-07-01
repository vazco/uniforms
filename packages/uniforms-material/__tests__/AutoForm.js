import React   from 'react';
import {mount} from 'enzyme';

import AutoForm from 'uniforms-material/AutoForm';

import createContext from './_createContext';
import createSchema  from './_createSchema';

test('<AutoForm> - works', () => {
    const element = <AutoForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(AutoForm)).toHaveLength(1);
});
