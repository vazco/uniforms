import React, { Ref, useEffect } from 'react';
import { HTMLFieldProps, filterDOMProps, useField } from 'uniforms';

export type HiddenFieldProps = HTMLFieldProps<
  unknown,
  HTMLInputElement,
  { inputRef?: Ref<HTMLInputElement>; noDOM?: boolean }
>;

export default function HiddenField({ value, ...rawProps }: HiddenFieldProps) {
  const props = useField(rawProps.name, rawProps, { initialValue: false })[0];

  useEffect(() => {
    if (value !== undefined && value !== props.value) props.onChange(value);
  });

  return props.noDOM ? null : (
    <input
      disabled={props.disabled}
      name={props.name}
      ref={props.inputRef}
      type="hidden"
      {...filterDOMProps(props)}
      value={(value ?? props.value ?? '') as string}
    />
  );
}
