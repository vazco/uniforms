import AutoForm from 'uniforms-unstyled/AutoForm';
import React, {useState} from 'react';

import GuestSchema from './GuestSchema';
import SubmittedData from './SubmittedData';

export default function GuestForm() {
  const [data, setData] = useState(null);

  return (
    <div className="GuestForm">
      <AutoForm schema={GuestSchema} onSubmit={setData} />
      <SubmittedData data={data} />
    </div>
  );
}
