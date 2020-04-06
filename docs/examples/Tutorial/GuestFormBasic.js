import React from 'react';
import { AutoForm } from '../../../website/components/universal';

import GuestSchema from './GuestSchema';

export default function GuestForm() {
  return <AutoForm schema={GuestSchema} onSubmit={console.log} />;
}
