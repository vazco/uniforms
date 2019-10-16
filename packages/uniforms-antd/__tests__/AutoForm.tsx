import AutoForm from 'uniforms-antd/AutoForm';
import React from 'react';

import mount from './_mount';

import createSchema from './_createSchema';

test('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
