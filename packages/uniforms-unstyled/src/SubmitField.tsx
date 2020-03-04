import React from 'react';
import { filterDOMProps, useField } from 'uniforms';

function SubmitField({ disabled, inputRef, value, ...props }: any) {
  const { error, state } = useField(props.name, props)[1];

  return (
    <input
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type={'submit'}
      {...(value ? { value } : {})}
      {...filterDOMProps(props)}
    />
  );
}

export default SubmitField;
