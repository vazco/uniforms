import Button from 'antd/lib/button';
import React, { useContext } from 'react';
import context from 'uniforms/context';

function SubmitField({ inputRef, value, ...props }) {
  const {
    error,
    state: { disabled }
  } = useContext(context).uniforms;

  return (
    <Button
      disabled={!!(error || disabled)}
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
