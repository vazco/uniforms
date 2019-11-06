import React, { useContext } from 'react';
import classnames from 'classnames';
import { context, filterDOMProps } from 'uniforms';

const SubmitField = ({ className, disabled, inputRef, value, ...props }) => {
  const { error, state } = useContext(context).uniforms;

  return (
    <input
      className={classnames('ui', className, 'button')}
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      {...(value ? { value } : {})}
      {...filterDOMProps(props)}
    />
  );
};

export default SubmitField;
