import Button from 'antd/lib/button';
import React from 'react';
import { useForm } from 'uniforms';
import { ButtonProps } from 'antd/lib/button/button';

type SubmitFieldProps = {
  inputRef: undefined;
  name: string;
} & ButtonProps;

function SubmitField({
  disabled,
  inputRef,
  value,
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

SubmitField.defaultProps = { value: 'Submit' };

export default SubmitField;
