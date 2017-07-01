import React   from 'react';
import {mount} from 'enzyme';

import ValidatedForm from 'uniforms-bootstrap4/ValidatedForm';

import createSchema from './_createSchema';

test('<ValidatedForm> - works', () => {
    const element = <ValidatedForm schema={createSchema()} />;
    const wrapper = mount(element);

    expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
