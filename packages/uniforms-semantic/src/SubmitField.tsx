import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { filterDOMProps, useForm } from 'uniforms';

type SubmitFieldProps = {
  className?: string;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
} & HTMLProps<HTMLInputElement>;

export default function SubmitField({
  className,
  disabled,
  inputRef,
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

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
}
