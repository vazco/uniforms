import React, { HTMLProps, Ref, useEffect } from 'react';
import { filterDOMProps, Override, useField } from 'uniforms';

export type HiddenFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    inputRef?: Ref<HTMLInputElement>;
    name: string;
    noDOM?: boolean;
    value?: any;
  }
>;

export default function HiddenField({ value, ...rawProps }: HiddenFieldProps) {
  const props = useField(rawProps.name, rawProps, { initialValue: false })[0];

  useEffect(() => {
    if (value !== undefined && value !== props.value) {
      props.onChange(value);
    }
  });

  return props.noDOM ? null : (
    <input
      disabled={props.disabled}
      name={props.name}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type="hidden"
      value={value ?? props.value ?? ''}
      {...filterDOMProps(props)}
    />
  );
}
