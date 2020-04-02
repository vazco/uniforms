import React from 'react';
import {
  AutoForm,
  AutoField,
  ErrorField,
  SubmitField
} from '../../../website/components/universal';

import GuestSchema from './GuestSchema';

export default function GuestFormWithErrorFields() {
  return (
    <AutoForm schema={GuestSchema} onSubmit={console.log}>
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
