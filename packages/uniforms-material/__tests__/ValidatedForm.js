import React   from 'react';
import {mount} from 'enzyme';

import ValidatedForm from 'uniforms-material/ValidatedForm';

import createContext from './_createContext';
import createSchema  from './_createSchema';

test('<ValidatedForm> - works', () => {
    const element = <ValidatedForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
