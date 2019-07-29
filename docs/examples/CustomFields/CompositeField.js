import React from 'react';
import connectField from 'uniforms/connectField';

import schema from './CompositeFieldSchema';
import {
  AutoField,
  AutoForm,
  SubmitField
} from '../../../website/components/universal';

// This field is a kind of a shortcut for few fields. You can also access all
// field props here, like value or onChange for some extra logic.
const Composite = () => (
  <section>
    <AutoField name="firstName" />
    <AutoField name="lastName" />
    <AutoField name="workExperience" />
  </section>
);

const CompositeField = connectField(Composite);

export default function ExamplesCompositeField() {
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
