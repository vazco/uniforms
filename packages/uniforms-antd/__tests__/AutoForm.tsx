import React from 'react';
import { AutoForm } from 'uniforms-antd';

import createSchema from './_createSchema';
import mount from './_mount';

it('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
