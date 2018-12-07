import React from 'react';
import {mount} from 'enzyme';

import QuickForm from 'uniforms-bootstrap4/QuickForm';

import createSchema from './_createSchema';

test('<QuickForm> - renders', () => {
  const element = <QuickForm schema={createSchema()} />;
  const wrapper = mount(element);

  expect(wrapper).toHaveLength(1);
});
