import QuickForm from 'uniforms-material/QuickForm';
import React from 'react';

import createContext from './_createContext';
import createSchema from './_createSchema';
import mount from './_mount';

test('<QuickForm> - works', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(QuickForm)).toHaveLength(1);
});
