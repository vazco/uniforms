import BaseForm from 'uniforms-bootstrap4/BaseForm';
import React from 'react';
import { mount } from 'enzyme';

import createSchema from './_createSchema';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
