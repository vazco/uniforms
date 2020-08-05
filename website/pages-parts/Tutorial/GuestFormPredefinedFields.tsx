import React from 'react';
import {
  AutoForm,
  AutoField,
  ErrorField,
  LongTextField,
  SelectField,
  SubmitField,
} from '../../lib/universal';

import { bridge as schema } from './GuestSchema2';

const professions = [
  {
    label: 'Developer',
    value: 'developer',
  },
  {
    label: 'Tester',
    value: 'tester',
  },
  {
    label: 'Product owner',
    value: 'product-owner',
  },
  {
    label: 'Project manager',
    value: 'project-manager',
  },
  {
    label: 'Businessman',
    value: 'businessman',
  },
];

export function GuestFormPredefinedFields() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
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
      <SelectField name="profession" options={professions} />
      <LongTextField name="additionalInfo" />
      <SubmitField />
    </AutoForm>
  );
}
