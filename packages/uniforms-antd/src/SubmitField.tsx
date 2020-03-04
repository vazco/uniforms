import Button from 'antd/lib/button';
import React from 'react';
import { useField } from 'uniforms';

function SubmitField({ disabled, inputRef, value, ...props }) {
  const { error, state } = useField(props.name, props)[1];

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
