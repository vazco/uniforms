import React from 'react';
import { ValidatedForm } from 'uniforms-antd';
import { mount } from 'enzyme';

import createSchema from './_createSchema';

test('<ValidatedForm> - works', () => {
  const element = <ValidatedForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper.find(ValidatedForm)).toHaveLength(1);
});
