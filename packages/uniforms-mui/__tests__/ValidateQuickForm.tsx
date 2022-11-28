import React from 'react';
import { ValidatedQuickForm } from 'uniforms-mui';

import createContext from './_createContext';
import createSchema from './_createSchema';
import mount from './_mount';

it('<ValidatedQuickForm> - works', () => {
  const element = <ValidatedQuickForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(ValidatedQuickForm)).toHaveLength(1);
});
