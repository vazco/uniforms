import AutoForm from 'uniforms-unstyled/AutoForm';
import ErrorField from 'uniforms-unstyled/ErrorField';
import NumField from 'uniforms-unstyled/NumField';
import React from 'react';
import SubmitField from 'uniforms-unstyled/SubmitField';
import TextField from 'uniforms-unstyled/TextField';

import GuestSchema from './GuestSchema';

export default function GuestForm5({ onSubmit }) {
  return (
    <AutoForm schema={GuestSchema} onSubmit={onSubmit}>
      <h4>IT meeting guest questionnaire</h4>
      <TextField name="lastName" />
      <ErrorField name="lastName" />
      <TextField name="firstName" />
      <ErrorField name="firstName" />
      <span>Do you want to share your work experience with us?</span>
      <NumField name="workExperience" />
      <ErrorField name="workExperience" />
      <SubmitField />
    </AutoForm>
  );
}
