import React from 'react';
import connectField from 'uniforms/connectField';

import {
  AutoForm,
  AutoField,
  SubmitField
} from '../../../website/components/universal';
import schema from './RangeFieldSchema';

// This field works as follows: two datepickers are bound to each other. Value is
// a {start, stop} object.
const Range = ({ value: { start, stop } }) => (
  <section>
    <AutoField name="start" max={stop} />
    <AutoField name="stop" min={start} />
  </section>
);

const RangeField = connectField(Range);

export default function ExamplesRangeField() {
  function transform(mode, model) {
    if (mode === 'validate') {
      const {
        range: { start, stop }
      } = model;

      return {
        range: {
          start: start && start.toISOString(),
          stop: stop && stop.toISOString()
        }
      };
    }

    return model;
  }

  return (
    <AutoForm
      modelTransform={transform}
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <RangeField name="range" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
