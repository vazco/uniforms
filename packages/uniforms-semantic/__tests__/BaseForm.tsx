import BaseForm from 'uniforms-semantic/BaseForm';
import React from 'react';

import createSchema from './_createSchema';
import mount from './_mount';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
