import React from 'react';

import GuestSchema from './GuestSchema';
import { AutoForm, AutoFields, ErrorsField, SubmitField } from './universal';

export default function GuestFormWithHeading() {
  return (
    <AutoForm schema={GuestSchema}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
