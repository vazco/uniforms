import classnames from 'classnames';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

export type LongTextFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>;

function LongText({
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
}: LongTextFieldProps) {
  return (
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
}

export default connectField(LongText, { kind: 'leaf' });
