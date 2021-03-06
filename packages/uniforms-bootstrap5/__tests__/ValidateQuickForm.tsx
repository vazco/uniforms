import React from 'react';
import { ValidatedQuickForm } from 'uniforms-bootstrap5';

import createSchema from './_createSchema';
import mount from './_mount';

test('<ValidatedQuickForm> - works', () => {
  const element = <ValidatedQuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedQuickForm)).toHaveLength(1);
});
