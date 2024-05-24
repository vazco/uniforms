import React, { Ref } from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';
import { Button, ButtonProps } from '@mantine/core';

export type SubmitFieldProps = Override<
  ButtonProps,
  { inputRef?: Ref<HTMLButtonElement>; label?: string }
>;

export default function SubmitField({
  children,
  disabled,
  inputRef,
  label = 'Submit',
  ...props
}: SubmitFieldProps) {
  const { error, state, submitting } = useForm();

  return (
    <Button
      mb="xs"
      disabled={
        disabled === undefined
          ? !!(error || state.disabled || submitting)
          : disabled
      }
      ref={inputRef}
      type="submit"
      variant="filled"
      {...filterDOMProps(props)}
    >
      {children || label}
    </Button>
  );
}
