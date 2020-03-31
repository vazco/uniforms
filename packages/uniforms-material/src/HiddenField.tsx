import React, { HTMLProps, Ref, useEffect } from 'react';
import { filterDOMProps, useField } from 'uniforms';

export type HiddenFieldProps = {
  inputRef?: Ref<HTMLInputElement>;
  name: string;
  noDOM?: boolean;
  value?: any;
} & HTMLProps<HTMLInputElement>;

export default function HiddenField({ value, ...rawProps }: HiddenFieldProps) {
  const props = useField(rawProps.name, rawProps, { initialValue: false })[0];

  useEffect(() => {
    if (value !== undefined && value !== props.value) props.onChange(value);
  });

  return props.noDOM ? null : (
    <input
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      ref={props.inputRef}
      type="hidden"
      value={value ?? props.value ?? ''}
      {...filterDOMProps(props)}
    />
  );
}
