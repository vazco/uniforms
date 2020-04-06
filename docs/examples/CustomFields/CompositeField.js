import React from 'react';
import {
  AutoField,
  AutoForm,
  SubmitField
} from '../../../website/components/universal';
import { connectField } from 'uniforms';

import schema from './CompositeFieldSchema';

const Composite = () => (
  <section>
    <AutoField name="firstName" />
    <AutoField name="lastName" />
    <AutoField name="workExperience" />
  </section>
);

const CompositeField = connectField(Composite);

export default function ExampleOfCompositeField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <CompositeField name="personA" />
      <hr />
      <CompositeField name="personB" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
