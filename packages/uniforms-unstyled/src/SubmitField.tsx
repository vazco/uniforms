import React, { HTMLProps, Ref } from 'react';
import { filterDOMProps, useForm } from 'uniforms';

type SubmitFieldProps = {
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
} & HTMLProps<HTMLInputElement>;

export default function SubmitField({
  disabled,
  inputRef,
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    <input
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      {...(value ? { value } : {})}
      {...filterDOMProps(props)}
    />
  );
}
