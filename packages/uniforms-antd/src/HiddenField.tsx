import React, { Ref, useEffect } from 'react';
import { connectField, filterDOMProps, useField } from 'uniforms';

type HiddenFieldProps = {
  inputRef?: Ref<HTMLInputElement>;
  name: string;
  noDOM?: boolean;
  value?: unknown;
};

export default function HiddenField(originialProps: HiddenFieldProps) {
  const props = useField(originialProps.name, originialProps)[0];

  useEffect(() => {
    const { value } = props;
    if (value !== undefined && originialProps.value !== value) {
      props.onChange(originialProps.value);
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
