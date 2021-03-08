import React from 'react';
import { AutoForm, SubmitField } from '../../lib/universal';
import { HTMLFieldProps, connectField } from 'uniforms';

import { bridge as schema } from './CycleFieldSchema';

type CycleProps = HTMLFieldProps<
  string,
  HTMLAnchorElement,
  { allowedValues: string[] }
>;

function Cycle({
  allowedValues,
  label,
  onChange,
  required,
  value,
}: CycleProps) {
  return (
    <button
      style={{
        border: '1px solid black',
        color: '#0e0e0e',
        cursor: 'pointer',
        display: 'inline-block',
        margin: '1em 0',
        padding: '1em',
      }}
      type="button"
      onClick={() =>
        onChange(
          value
            ? allowedValues.indexOf(value) === allowedValues.length - 1
              ? required
                ? allowedValues[0]
                : null
              : allowedValues[allowedValues.indexOf(value) + 1]
            : allowedValues[0],
        )
      }
    >
      ➡ {value || label} ➡
    </button>
  );
}

const CycleField = connectField(Cycle);

export function CycleFieldForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    >
      <CycleField name="cycle" allowedValues={['One', 'Two', 'Three']} />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
