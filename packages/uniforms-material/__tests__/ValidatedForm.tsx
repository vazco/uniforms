import React from 'react';
import { ValidatedForm } from 'uniforms-material';

import createContext from './_createContext';
import createSchema from './_createSchema';
import mount from './_mount';

it('<ValidatedForm> - works', () => {
  const element = <ValidatedForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
