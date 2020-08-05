import Button, { ButtonProps } from 'antd/lib/button';
import React, { Ref } from 'react';
import { Override, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  ButtonProps,
  { inputRef?: Ref<HTMLInputElement> }
>;

function SubmitField({
  disabled,
  inputRef,
  value = 'Submit',
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      htmlType="submit"
      ref={inputRef}
      type="primary"
      {...props}
    >
      {value}
    </Button>
  );
}

export default SubmitField;
