import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { filterDOMProps, useField } from 'uniforms';

type SubmitFieldProps = {
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
  name: string;
} & HTMLProps<HTMLInputElement>;

const SubmitField = ({
  className,
  disabled,
  inputRef,
  value,
  name,
  ...props
}: SubmitFieldProps) => {
  const { error, state } = useField(name, props)[1];

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
