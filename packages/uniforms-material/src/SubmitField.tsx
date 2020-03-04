import Button from '@material-ui/core/Button';
import React from 'react';
import { filterDOMProps, useField } from 'uniforms';

const SubmitField = ({
  children,
  disabled,
  inputRef,
  label,
  value,
  ...props
}: any) => {
  const { error, state } = useField(props.name, props)[1];

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      value={value}
      {...filterDOMProps(props)}
    >
      {children || label}
    </Button>
  );
};

SubmitField.defaultProps = { label: 'Submit', variant: 'contained' };

export default SubmitField;
