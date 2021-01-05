import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { filterDOMProps, Override, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  { disabled?: boolean; inputRef?: Ref<HTMLInputElement>; value?: string }
>;

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
