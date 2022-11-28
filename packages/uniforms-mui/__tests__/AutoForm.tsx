import React from 'react';
import { AutoForm } from 'uniforms-mui';

import createContext from './_createContext';
import createSchema from './_createSchema';
import mount from './_mount';

test('<AutoForm> - works', () => {
  const element = <AutoForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(AutoForm)).toHaveLength(1);
});
