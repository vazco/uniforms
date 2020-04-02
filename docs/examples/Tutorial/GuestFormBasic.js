import { AutoForm } from '../../../website/components/universal';
import React from 'react';

import GuestSchema from './GuestSchema';

export default function GuestFormBasic() {
  return <AutoForm schema={GuestSchema} onSubmit={console.log} />;
}
