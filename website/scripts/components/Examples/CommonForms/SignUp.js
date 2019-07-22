import React from 'react';

import schema from './SignUpSchema';
import { AutoForm } from '../../universal';

export default function SignUpForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}
