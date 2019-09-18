import React from 'react';
import { mount } from 'enzyme';

import ValidatedQuickForm from 'uniforms-unstyled/ValidatedQuickForm';
import createSchema from './_createSchema';

test('<ValidatedQuickForm> - works', () => {
  const element = <ValidatedQuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedQuickForm)).toHaveLength(1);
});
