import React   from 'react';
import {mount} from 'enzyme';

import QuickForm from 'uniforms-material/QuickForm';

import createContext from './_createContext';
import createSchema  from './_createSchema';

test('<QuickForm> - works', () => {
    const element = <QuickForm schema={createSchema()} />;
    const wrapper = mount(element, createContext());

    expect(wrapper.find(QuickForm)).toHaveLength(1);
});
