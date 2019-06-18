import React from 'react';
import { mount } from 'enzyme';

import BaseForm from 'uniforms-bootstrap3/BaseForm';

import createSchema from './_createSchema';

test('<BaseForm> - works', () => {
  const element = <BaseForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(BaseForm)).toHaveLength(1);
});
