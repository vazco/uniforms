import React from 'react';
import ValidatedForm from 'uniforms-antd/ValidatedForm';

import createSchema from './_createSchema';
import mount from './_mount';

test('<ValidatedForm> - works', () => {
  const element = <ValidatedForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
