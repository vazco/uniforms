import React from 'react';
import { ValidatedForm } from 'uniforms-unstyled';

import createSchema from './_createSchema';
import mount from './_mount';

it('<ValidatedForm> - works', () => {
  const element = <ValidatedForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
