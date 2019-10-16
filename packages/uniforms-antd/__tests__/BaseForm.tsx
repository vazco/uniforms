import BaseForm from 'uniforms-antd/BaseForm';
import React from 'react';

import mount from './_mount';

import createSchema from './_createSchema';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
