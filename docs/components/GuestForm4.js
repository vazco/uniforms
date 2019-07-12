import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import ErrorField from 'uniforms-unstyled/ErrorField';
import React from 'react';
import SubmitField from 'uniforms-unstyled/SubmitField';

import GuestSchema from './GuestSchema';

export default function GuestForm4({ onSubmit }) {
  return (
    <AutoForm schema={GuestSchema} onSubmit={onSubmit}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <ErrorField name="lastName" />
      <AutoField name="firstName" />
      <ErrorField name="firstName" />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorField name="workExperience" />
      <SubmitField />
    </AutoForm>
  );
}
