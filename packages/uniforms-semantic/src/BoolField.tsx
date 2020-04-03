import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type BoolFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    error?: boolean;
    errorMessage?: string;
    inputRef?: Ref<HTMLInputElement>;
    onChange: (value?: boolean) => void;
    showInlineError?: boolean;
    value?: boolean;
  }
>;

const Bool = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  required,
  showInlineError,
  value,
  ...props
}: BoolFieldProps) => (
  <div
    className={classnames(className, { disabled, error, required }, 'field')}
    {...filterDOMProps(props)}
  >
    <div className="ui checkbox">
      <input
        checked={value || false}
        className="hidden"
        disabled={disabled}
        id={id}
        name={name}
        onChange={() => onChange(!value)}
        ref={inputRef}
        type="checkbox"
      />

      <label htmlFor={id}>{label}</label>
    </div>

    {!!(error && showInlineError) && (
      <div>
        <div className="ui red basic pointing label">{errorMessage}</div>
      </div>
    )}
  </div>
);

export default connectField(Bool);
