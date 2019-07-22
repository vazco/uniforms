import React from 'react';

import GuestSchema from './GuestSchema';
import { AutoForm } from './universal';

export default function GuestFormBasic() {
  return <AutoForm schema={GuestSchema} />;
}
