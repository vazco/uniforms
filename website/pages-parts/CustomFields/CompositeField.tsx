import React from 'react';
import { AutoField, AutoForm, SubmitField } from '../../lib/universal';
import { connectField } from 'uniforms';

import { bridge as schema } from './CompositeFieldSchema';

function Composite() {
  return (
    <section>
      <AutoField name="firstName" />
      <AutoField name="lastName" />
      <AutoField name="workExperience" />
    </section>
  );
}

const CompositeField = connectField(Composite);

export function CompositeFieldForm() {
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
