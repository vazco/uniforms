import { Button, ButtonProps } from '@mantine/core';
import React, { Ref } from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  ButtonProps,
  { inputRef?: Ref<HTMLButtonElement>; label?: string }
>;

function SubmitField({
  children,
  disabled,
  inputRef,
  label = 'Submit',
  ...props
}: SubmitFieldProps) {
  const form = useForm();

  return (
    <Button
      disabled={
        disabled === undefined
          ? !!(form.error || form.state.disabled || form.submitting)
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

export default SubmitField;
