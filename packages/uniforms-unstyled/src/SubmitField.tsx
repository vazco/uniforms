import React from 'react';
import { BaseField, filterDOMProps } from 'uniforms';

const SubmitField = (
  { disabled, inputRef, value, ...props },
  { uniforms: { error, state } },
) => (
  <input
    disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
    ref={inputRef}
    type="submit"
    {...(value ? { value } : {})}
    {...filterDOMProps(props)}
  />
);
SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
