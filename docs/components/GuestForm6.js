import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import ErrorField from 'uniforms-unstyled/ErrorField';
import React from 'react';
import SubmitField from 'uniforms-unstyled/SubmitField';

import GuestSchema2 from './GuestSchema2';

export default function GuestForm6({ onSubmit }) {
  return (
    <AutoForm schema={GuestSchema2} onSubmit={onSubmit}>
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
      <SubmitField />
    </AutoForm>
  );
}
