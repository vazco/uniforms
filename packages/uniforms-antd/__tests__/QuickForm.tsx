import QuickForm from 'uniforms-antd/QuickForm';
import React from 'react';

import mount from './_mount';

import createSchema from './_createSchema';

test('<QuickForm> - renders', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper).toHaveLength(1);
});
