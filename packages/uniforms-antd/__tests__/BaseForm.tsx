import BaseForm from 'uniforms-antd/BaseForm';
import React from 'react';

import createSchema from './_createSchema';
import mount from './_mount';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
