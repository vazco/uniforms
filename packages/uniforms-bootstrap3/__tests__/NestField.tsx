import AutoField from 'uniforms-bootstrap3/AutoField';
import NestField from 'uniforms-bootstrap3/NestField';
import React from 'react';

import createContext from './_createContext';
import mount from './_mount';

test('<NestField> - renders an <AutoField> for each field', () => {
  const element = <NestField name="x" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number }
    })
  );

  expect(wrapper.find(AutoField)).toHaveLength(2);
  expect(
    wrapper
      .find(AutoField)
      .at(0)
      .prop('name')
  ).toBe('x.a');
  expect(
    wrapper
      .find(AutoField)
      .at(1)
      .prop('name')
  ).toBe('x.b');
});

test('<NestField> - renders custom content if given', () => {
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
      'x.b': { type: Number }
    })
  );

  expect(wrapper.find(AutoField)).toHaveLength(0);
  expect(wrapper.find('article')).toHaveLength(1);
  expect(wrapper.find('article').prop('data-test')).toBe('content');
});

test('<NestField> - renders a label', () => {
  const element = <NestField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number }
    })
  );

  expect(wrapper.find('label')).toHaveLength(3);
  expect(
    wrapper
      .find('label')
      .at(0)
      .text()
  ).toBe('y');
});

test('<NestField> - renders a wrapper with unknown props', () => {
  const element = <NestField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number }
    })
  );

  expect(
    wrapper
      .find('div')
      .at(0)
      .prop('data-x')
  ).toBe('x');
  expect(
    wrapper
      .find('div')
      .at(0)
      .prop('data-y')
  ).toBe('y');
  expect(
    wrapper
      .find('div')
      .at(0)
      .prop('data-z')
  ).toBe('z');
});

test('<NestField> - renders correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <NestField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number }
    })
  );

  expect(wrapper.find('.help-block').text()).toBe('Error');
});

test('<NestField> - renders correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <NestField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(
    element,
    createContext({
      x: { type: Object },
      'x.a': { type: String },
      'x.b': { type: Number }
    })
  );

  expect(wrapper.find('.help-block')).toHaveLength(0);
});
