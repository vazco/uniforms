import React from 'react';
import { AutoForm, AutoField, SubmitField } from '../../lib/universal';
import { HTMLFieldProps, ModelTransformMode, connectField } from 'uniforms';

import { bridge as schema } from './RangeFieldSchema';

type RangeProps = HTMLFieldProps<{ start: Date; stop: Date }, HTMLDivElement>;

const defaultDates = { start: new Date(), stop: new Date() };

function Range({ value: { start, stop } = defaultDates }: RangeProps) {
  return (
    <div>
      <AutoField InputLabelProps={{ shrink: true }} name="start" max={stop} />
      <AutoField InputLabelProps={{ shrink: true }} name="stop" min={start} />
    </div>
  );
}

const RangeField = connectField(Range);

const model = {
  range: { start: new Date(2019, 7, 10), stop: new Date(2019, 7, 20) },
};

export default function ExampleOfRangeField() {
  function transform(mode: ModelTransformMode, model: any) {
    if (mode === 'validate') {
      const { start, stop } = model.range || {};

      return {
        range: {
          start: start && start.toISOString(),
          stop: stop && stop.toISOString(),
        },
      };
    }

    return model;
  }

  return (
    <AutoForm
      model={model}
      modelTransform={transform}
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    >
      <RangeField name="range" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
