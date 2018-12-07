import BaseField from 'uniforms/BaseField';
import React from 'react';
import classnames from 'classnames';
import filterDOMProps from 'uniforms/filterDOMProps';

const SubmitField = ({className, disabled, inputRef, value, ...props}, {uniforms: {error, state}}) => (
  <input
    className={classnames('ui', className, 'button')}
    disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
    ref={inputRef}
    type="submit"
    {...(value ? {value} : {})}
    {...filterDOMProps(props)}
  />
);
SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
