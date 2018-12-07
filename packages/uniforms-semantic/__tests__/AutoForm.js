import React from 'react';
import {mount} from 'enzyme';

import AutoForm from 'uniforms-semantic/AutoForm';

import createSchema from './_createSchema';

test('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
