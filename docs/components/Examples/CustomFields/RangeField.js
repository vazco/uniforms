import React from 'react';
import connectField from 'uniforms/connectField';

import { AutoForm, SubmitField, DateField } from '../../universal';
import schema from './RangeFieldSchema';

// This field works as follows: two datepickers are bound to each other. Value is
// a {start, stop} object.
const Range = ({ onChange, value: { start, stop } }) => (
  <section>
    <DateField
      name="start"
      max={stop}
      value={start}
      onChange={start => onChange({ start, stop })}
    />
    <DateField
      name="stop"
      min={start}
      value={stop}
      onChange={stop => onChange({ start, stop })}
    />
  </section>
);

const RangeField = connectField(Range);

export default function ExamplesRangeField() {
  return (
    <AutoForm schema={schema}>
      <RangeField name="range" />
      <SubmitField />
    </AutoForm>
  );
}
