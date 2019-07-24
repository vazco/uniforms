import React from 'react';

import GuestSchema from './GuestSchema';
import {
  AutoForm,
  AutoField,
  ErrorField,
  SubmitField
} from '../../../website/components/universal';

export default function GuestFormWithErrorFields() {
  return (
    <AutoForm schema={GuestSchema}>
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
