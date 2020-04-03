import React from 'react';
import { AutoForm, SubmitField } from '../../../website/components/universal';
import { connectField } from 'uniforms';

import schema from './CycleFieldSchema';

// This field works as follows: iterate all allowed values and optionally no-value
// state if the field is not required. This one uses Semantic-UI.
const Cycle = ({ allowedValues, label, required, value, onChange }) => (
  <a
    style={{
      margin: '1em 0',
      color: '#0e0e0e',
      border: '1px solid black',
      padding: '1em',
      display: 'inline-block',
      cursor: 'pointer'
    }}
    onClick={() =>
      onChange(
        value
          ? allowedValues.indexOf(value) === allowedValues.length - 1
            ? required
              ? allowedValues[0]
              : null
            : allowedValues[allowedValues.indexOf(value) + 1]
          : allowedValues[0]
      )
    }
  >
    ➡ {value || label} ➡
  </a>
);

const CycleField = connectField(Cycle);

export default function ExamplesCycleField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <CycleField name="cycle" allowedValues={['One', 'Two', 'Three']} />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
