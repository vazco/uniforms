import React from 'react';
import { AutoField, AutoForm } from '../../lib/universal';
import { connectField, useForm } from 'uniforms';

import { bridge as schema } from './SubmitFieldSchema';

function SubmitField() {
  const {
    error,
    state: { disabled },
    submitting,
    validating,
  } = useForm();

  return (
    <input
      disabled={!!error || disabled || submitting || validating}
      type="submit"
    />
  );
}

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

export function SubmitFieldForm() {
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
