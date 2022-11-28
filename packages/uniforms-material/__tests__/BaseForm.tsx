import React from 'react';
import { BaseForm } from 'uniforms-material';

import createContext from './_createContext';
import createSchema from './_createSchema';
import mount from './_mount';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
