import React from 'react';
import { AutoForm } from '../../lib/universal';

import { bridge as schema } from './SignUpSchema';

export function SignUp() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    />
  );
}
