import React from 'react';
import ValidatedQuickForm from 'uniforms-antd/ValidatedQuickForm';
import { mount } from 'enzyme';

import createSchema from './_createSchema';

test('<ValidatedQuickForm> - works', () => {
  const element = <ValidatedQuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedQuickForm)).toHaveLength(1);
});
