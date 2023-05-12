import React from 'react';
import { AutoForm, SubmitField } from '../../lib/universal';
import { HTMLFieldProps, connectField } from 'uniforms';

import { bridge as schema } from './CycleFieldSchema';

/** Option type used in SelectField or RadioField */
export type Option<Value> = {
  disabled?: boolean;
  label?: string;
  key?: string;
  value: Value;
};

type CycleProps = HTMLFieldProps<
  number,
  HTMLAnchorElement,
  { options: Option<number>[] }
>;

function Cycle({ options, label, onChange, required, value }: CycleProps) {
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
            ? options.findIndex(option => option.value === value) ===
              options.length - 1
              ? required
                ? options[0].value
                : undefined
              : options[options.findIndex(option => option.value === value) + 1]
                  .value
            : options[0].value,
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
      <CycleField
        name="cycle"
        options={[
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
          { label: 'Three', value: 3 },
        ]}
      />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
