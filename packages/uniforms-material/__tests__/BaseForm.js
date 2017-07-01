import React   from 'react';
import {mount} from 'enzyme';

import BaseForm from 'uniforms-material/BaseForm';

import createContext from './_createContext';
import createSchema  from './_createSchema';

test('<BaseForm> - works', () => {
    const element = <BaseForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(BaseForm)).toHaveLength(1);
});
