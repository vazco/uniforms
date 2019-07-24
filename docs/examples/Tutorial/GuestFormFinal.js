import React from 'react';

import GuestSchema4 from './GuestSchema4';
import {
  AutoField,
  AutoForm,
  ErrorField,
  SubmitField
} from '../../../website/components/universal';

export default function GuestFormFinal() {
  return (
    <AutoForm schema={GuestSchema4}>
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
      <AutoField name="profession" />
      <AutoField name="additionalInfo" />
      <AutoField name="pictureUrl" />
      <SubmitField />
    </AutoForm>
  );
}
