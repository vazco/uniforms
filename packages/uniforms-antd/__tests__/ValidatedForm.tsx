import React from 'react';
import ValidatedForm from 'uniforms-antd/ValidatedForm';

import mount from './_mount';

import createSchema from './_createSchema';

test('<ValidatedForm> - works', () => {
  const element = <ValidatedForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
