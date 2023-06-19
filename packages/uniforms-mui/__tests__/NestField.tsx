import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { NestField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

test('<NestField> - renders a Subheader', () => {
  const element = <NestField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(FormLabel).at(0).text()).toBe('y *');
});

test('<NestField> - renders a helperText', () => {
  const element = <NestField name="x" helperText="Helper" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(FormHelperText)).toHaveLength(1);
  expect(wrapper.find(FormHelperText).text()).toBe('Helper');
});
