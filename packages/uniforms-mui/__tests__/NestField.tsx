import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { AutoField, NestField } from 'uniforms-mui';

import createContext from './_createContext';
import mount from './_mount';

it('<NestField> - renders an <AutoField> for each field', () => {
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

it('<NestField> - renders custom content if given', () => {
  const element = (
    <NestField name="x">
      <article data-test="content" />
    </NestField>
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number },
    }),
  );

  expect(wrapper.find(AutoField)).toHaveLength(0);
  expect(wrapper.find('article')).toHaveLength(1);
  expect(wrapper.find('article').prop('data-test')).toBe('content');
});

it('<NestField> - renders a Subheader', () => {
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

it('<NestField> - renders a helperText', () => {
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
