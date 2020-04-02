import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField
} from '../../../website/components/universal';
import React from 'react';

import GuestSchema from './GuestSchema';

export default function GuestFormWithHeading() {
  return (
    <AutoForm schema={GuestSchema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
