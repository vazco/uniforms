import React from 'react';
import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField
} from '../../../website/components/universal';

import GuestSchema from './GuestSchema';

export default function GuestForm() {
  return (
    <AutoForm schema={GuestSchema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
