import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = {
  className?: string;
  disabled: boolean;
  error: unknown;
  errorMessage: string;
  id: string;
  inputRef?: Ref<HTMLTextAreaElement>;
  label: string;
  name: string;
  onChange: (value?: string) => void;
  placeholder: string;
  required?: boolean;
  showInlineError: boolean;
  value?: string;
} & HTMLProps<HTMLDivElement>;

const LongText = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  value,
  ...props
}: LongTextFieldProps) => (
  <div
    className={classnames(className, { disabled, error, required }, 'field')}
    {...filterDOMProps(props)}
  >
    {label && <label htmlFor={id}>{label}</label>}

    <textarea
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value ?? ''}
    />

    {!!(error && showInlineError) && (
      <div className="ui red basic pointing label">{errorMessage}</div>
    )}
  </div>
);

export default connectField<LongTextFieldProps>(LongText);
