import React from 'react';
import { QuickForm } from 'uniforms-unstyled';

import createSchema from './_createSchema';
import mount from './_mount';

test('<QuickForm> - renders', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper).toHaveLength(1);
});
