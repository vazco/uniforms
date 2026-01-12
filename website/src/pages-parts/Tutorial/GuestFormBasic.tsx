import React from 'react';
import { AutoForm } from '../../lib/universal';

import { bridge as schema } from './GuestSchema';

export function GuestFormBasic() {
  return <AutoForm schema={schema} onSubmit={console.log} />;
}
