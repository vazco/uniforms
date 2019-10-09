import React from 'react';
import ValidatedQuickForm from 'uniforms-material/ValidatedQuickForm';
import { mount } from 'enzyme';

import createContext from './_createContext';
import createSchema from './_createSchema';

test('<ValidatedQuickForm> - works', () => {
  const element = <ValidatedQuickForm schema={createSchema()} />;
  const wrapper = mount(element, createContext());

  expect(wrapper.find(ValidatedQuickForm)).toHaveLength(1);
});
