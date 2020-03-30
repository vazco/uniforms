import React from 'react';

import schema from './SampleLayoutSchema';
import AutoLayoutField from './AutoLayoutField';
import { AutoFields, AutoForm } from '../../../website/components/universal';

export default function AutoLayoutFields() {
  return (
    <AutoForm schema={schema}>
      <AutoFields
        autoField={AutoLayoutField}
        style={{
          display: 'grid',
          gridTemplateAreas: `
            "firstName lastName"
            "workExperience ."
            `,
          columnGap: '1em',
          rowGap: '.5em'
        }}
      />
    </AutoForm>
  );
}
