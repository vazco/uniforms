import Button from 'antd/lib/button';
import React, { useContext } from 'react';
import context from 'uniforms/context';

function SubmitField({ disabled, inputRef, value, ...props }) {
  const { error, state } = useContext(context).uniforms;

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
