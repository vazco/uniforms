import React from 'react';
import {
  AutoField,
  AutoForm,
  ErrorsField,
  SubmitField
} from '../../../website/components/universal';

import GuestSchema from './GuestSchema';

export default function GuestForm() {
  return (
    <AutoForm schema={GuestSchema} onSubmit={console.log}>
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
