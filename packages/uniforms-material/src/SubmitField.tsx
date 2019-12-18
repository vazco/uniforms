import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { context, filterDOMProps } from 'uniforms';

const SubmitField = ({
  children,
  disabled,
  inputRef,
  label,
  value,
  ...props
}: any) => {
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
