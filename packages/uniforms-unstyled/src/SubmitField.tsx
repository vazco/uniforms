import React, { useContext } from 'react';
import context from 'uniforms/context';
import filterDOMProps from 'uniforms/filterDOMProps';

function SubmitField({ disabled, inputRef, value, ...props }) {
  const { error, state } = useContext(context).uniforms;

  return (
    <input
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      {...(value ? { value } : {})}
      {...filterDOMProps(props)}
    />
  );
}

export default SubmitField;
