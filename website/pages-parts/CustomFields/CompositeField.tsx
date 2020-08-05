import React from 'react';
import { AutoField, AutoForm, SubmitField } from '../../lib/universal';
import { connectField } from 'uniforms';

import { bridge as schema } from './CompositeFieldSchema';

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
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    >
      <CompositeField name="personA" />
      <hr />
      <CompositeField name="personB" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
