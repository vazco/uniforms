import React from 'react';
import connectField from 'uniforms/connectField';

import { AutoForm, SubmitField } from '../../universal';
import schema from './RangeFieldSchema';

// This field works as follows: two datepickers are bound to each other. Value is
// a {start, stop} object.
const Range = ({ onChange, value: { start, stop } }) => (
  <section>
    <input
      type="date"
      name="start"
      max={stop}
      onChange={({ target: { value } }) => onChange({ start: value, stop })}
    />
    <input
      type="date"
      name="stop"
      min={start}
      onChange={({ target: { value } }) => onChange({ start, stop: value })}
    />
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
