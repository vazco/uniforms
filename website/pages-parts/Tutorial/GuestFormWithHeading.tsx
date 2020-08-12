import React from 'react';
import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField,
} from '../../lib/universal';

import { bridge as schema } from './GuestSchema';

export function GuestFormWithHeading() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
