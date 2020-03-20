import Button from 'antd/lib/button';
import React from 'react';
import { useField } from 'uniforms';
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
  const { error, state } = useField(name, props)[1];

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
