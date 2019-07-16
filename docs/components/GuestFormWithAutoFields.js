import React from 'react';

import GuestSchema from './GuestSchema';
import { AutoForm, AutoField, ErrorsField, SubmitField } from './universal';

export default function GuestFormWithAutoFields() {
  return (
    <AutoForm schema={GuestSchema}>
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
