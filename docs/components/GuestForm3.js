import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import React from 'react';
import SubmitField from 'uniforms-unstyled/SubmitField';

import GuestSchema from './GuestSchema';

export default function GuestForm3({onSubmit}) {
  return (
    <AutoForm schema={GuestSchema} onSubmit={onSubmit}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <AutoField name="firstName" />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
