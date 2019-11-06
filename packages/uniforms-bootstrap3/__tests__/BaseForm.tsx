import React from 'react';
import { BaseForm } from 'uniforms-bootstrap3';

import createSchema from './_createSchema';
import mount from './_mount';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
