import React from 'react';

import schema from './SignUpSchema';
import { AutoForm } from '../../../website/components/universal';

export default function SignUpForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}
