import AutoForm from 'uniforms-unstyled/AutoForm';
import React from 'react';

import GuestSchema from './GuestSchema';

export default function GuestForm({ onSubmit }) {
  return <AutoForm schema={GuestSchema} onSubmit={onSubmit} />;
}
