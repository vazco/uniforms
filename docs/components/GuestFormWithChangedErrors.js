import React from 'react';

import GuestSchema from './GuestSchema';
import { AutoForm, AutoField, ErrorField, SubmitField } from './universal';

export default function GuestFormWithChangedErrors() {
  return (
    <AutoForm schema={GuestSchema}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <ErrorField name="lastName">
        <span>You have to provide your last name!</span>
      </ErrorField>
      <AutoField name="firstName" />
      <ErrorField
        name="firstName"
        errorMessage="You have to provide your first name!"
      />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorField
        name="workExperience"
        errorMessage="Your work experience cannot be lesser than 0 or greater than 100 years!"
      />
      <SubmitField />
    </AutoForm>
  );
}
