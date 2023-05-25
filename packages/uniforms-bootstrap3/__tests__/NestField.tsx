import React from 'react';
import { AutoField, NestField } from 'uniforms-bootstrap3';

import createContext from './_createContext';
import mount from './_mount';

test('<NestField> - renders an <AutoField> for each field', () => {
  const element = <NestField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(AutoField)).toHaveLength(2);
  expect(wrapper.find(AutoField).at(0).prop('name')).toBe('a');
  expect(wrapper.find(AutoField).at(1).prop('name')).toBe('b');
});
