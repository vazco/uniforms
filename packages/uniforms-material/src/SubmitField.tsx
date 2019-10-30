import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import context from 'uniforms/context';
import filterDOMProps from 'uniforms/filterDOMProps';

const SubmitField = ({
  children,
  disabled,
  inputRef,
  label,
  value,
  ...props
}) => {
  const { error, state } = useContext(context).uniforms;

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
