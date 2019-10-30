import QuickForm from 'uniforms-bootstrap4/QuickForm';
import React from 'react';

import createSchema from './_createSchema';
import mount from './_mount';

test('<QuickForm> - renders', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper).toHaveLength(1);
});
