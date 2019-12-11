import React from 'react';
import classnames from 'classnames';
import { BaseField, filterDOMProps } from 'uniforms';

const SubmitField = (
  { className, disabled, inputRef, value, ...props }: any,
  { uniforms: { error, state } },
) => (
  <input
    className={classnames('ui', className, 'button')}
    disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
    ref={inputRef}
    type="submit"
    {...(value ? { value } : {})}
    {...filterDOMProps(props)}
  />
);

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
