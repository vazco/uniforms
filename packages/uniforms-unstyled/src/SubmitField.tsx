import React, { HTMLProps, Ref } from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  { inputRef?: Ref<HTMLInputElement>; value?: string }
>;

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
