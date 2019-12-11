import Button from '@material-ui/core/Button';
import React from 'react';
import { BaseField, filterDOMProps } from 'uniforms';

const SubmitField = (
  { children, disabled, inputRef, label, value, ...props }: any,
  { uniforms: { error, state } },
) => (
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

SubmitField.contextTypes = BaseField.contextTypes;
SubmitField.defaultProps = { label: 'Submit', variant: 'contained' };

export default SubmitField;
