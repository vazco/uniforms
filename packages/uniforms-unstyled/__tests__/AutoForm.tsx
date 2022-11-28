import React from 'react';
import { AutoForm } from 'uniforms-unstyled';

import createSchema from './_createSchema';
import mount from './_mount';

test('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
