import React from 'react';

import schema from './SignUpSchema';
import { AutoForm } from '../../../website/scripts/components/universal';

export default function SignUpForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}
