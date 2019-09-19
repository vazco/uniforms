import AutoForm from 'uniforms-unstyled/AutoForm';
import React from 'react';
import { mount } from 'enzyme';

import createSchema from './_createSchema';

test('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
