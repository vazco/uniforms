import React from 'react';
import connectField from 'uniforms/connectField';

import {
  AutoForm,
  DateField,
  SubmitField
} from '../../../website/components/universal';
import schema from './RangeFieldSchema';

// This field works as follows: two datepickers are bound to each other. Value is
// a {start, stop} object.
const Range = ({ value: { start, stop } }) => (
  <section>
    <DateField name="start" max={stop} />
    <DateField name="stop" min={start} />
  </section>
);

const RangeField = connectField(Range);

export default function ExamplesRangeField() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <RangeField name="range" />
      <SubmitField />
    </AutoForm>
  );
}
