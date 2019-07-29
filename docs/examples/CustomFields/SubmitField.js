import React from 'react';
import BaseField from 'uniforms/BaseField';
import connectField from 'uniforms/connectField';

import schema from './CompositeFieldSchema';
import { AutoField, AutoForm } from '../../../website/components/universal';

// This field works as follows: render standard submit field and disable it, when
// the form is invalid. It's a simplified version of a default SubmitField from
// uniforms-unstyled.
const SubmitField = (
  props,
  {
    uniforms: {
      error,
      state: { disabled, submitting, validating }
    }
  }
) => (
  <input
    disabled={!!(error || disabled || submitting || validating)}
    type="submit"
  />
);
SubmitField.contextTypes = BaseField.contextTypes;

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

export default function ExamplesSubmitField() {
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
