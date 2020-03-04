import React, { Ref, useEffect } from 'react';
import { filterDOMProps, useField } from 'uniforms';

type HiddenFieldProps = {
  inputRef?: Ref<HTMLInputElement>;
  name: string;
  noDOM?: boolean;
  value?: unknown;
};

export default function HiddenField(originalProps: HiddenFieldProps) {
  const props = useField(originalProps.name, originalProps)[0];

  useEffect(() => {
    const { value } = props;
    if (value !== undefined && originalProps.value !== value) {
      props.onChange(originalProps.value);
    }
  });

  return props.noDOM ? null : (
    <input
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      ref={props.inputRef}
      type="hidden"
      value={props.value as string}
      {...filterDOMProps(props)}
    />
  );
}
