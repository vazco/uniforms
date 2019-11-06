import React from 'react';
import { connectField } from 'uniforms';

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
    <AutoField
      InputLabelProps={{
        shrink: true
      }}
      name="start"
      max={stop}
    />
    <AutoField
      InputLabelProps={{
        shrink: true
      }}
      name="stop"
      min={start}
    />
  </section>
);

const RangeField = connectField(Range);

const model = {
  range: { start: new Date(2019, 7, 10), stop: new Date(2019, 7, 20) }
};

export default function ExamplesRangeField() {
  function transform(mode, model) {
    if (mode === 'validate') {
      const { start, stop } = model.range || {};

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
      model={model}
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
