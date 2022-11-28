import React from 'react';
import { QuickForm } from 'uniforms-bootstrap3';

import createSchema from './_createSchema';
import mount from './_mount';

it('<QuickForm> - renders', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper).toHaveLength(1);
});
