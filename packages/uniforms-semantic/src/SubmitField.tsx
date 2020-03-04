import React from 'react';
import classnames from 'classnames';
import { filterDOMProps, useField } from 'uniforms';

const SubmitField = ({
  className,
  disabled,
  inputRef,
  value,
  ...props
}: any) => {
  const { error, state } = useField(props.name, props)[1];

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
