import AutoFields from 'uniforms-unstyled/AutoFields';
import AutoForm from 'uniforms-unstyled/AutoForm';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import React from 'react';
import SubmitField from 'uniforms-unstyled/SubmitField';

import GuestSchema from './GuestSchema';

export default function GuestForm2({onSubmit}) {
  return (
    <AutoForm schema={GuestSchema} onSubmit={onSubmit}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
