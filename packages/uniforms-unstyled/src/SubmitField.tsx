import React, { useContext } from 'react';
import { context, filterDOMProps } from 'uniforms';

function SubmitField({ disabled, inputRef, value, ...props }: any) {
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
