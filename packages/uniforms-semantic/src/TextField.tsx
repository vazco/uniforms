import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = {
  className?: string;
  disabled: boolean;
  error: unknown;
  errorMessage: string;
  icon?: string;
  iconLeft?: string;
  iconProps?: object;
  id: string;
  inputRef?: Ref<HTMLInputElement>;
  label: string;
  name: string;
  onChange: (value?: string) => void;
  placeholder: string;
  required?: boolean;
  showInlineError: boolean;
  type?: string;
  value?: string;
  wrapClassName?: string;
} & HTMLProps<HTMLDivElement>;

const Text = ({
  className,
  disabled,
  error,
  errorMessage,
  icon,
  iconLeft,
  iconProps,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  type,
  value,
  wrapClassName,
  ...props
}: TextFieldProps) => (
  <div
    className={classnames(className, { disabled, error, required }, 'field')}
    {...filterDOMProps(props)}
  >
    {label && <label htmlFor={id}>{label}</label>}

    <div
      className={classnames(
        'ui',
        wrapClassName,
        { left: iconLeft, icon: icon || iconLeft },
        'input',
      )}
    >
      <input
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        value={value ?? ''}
      />

      {(icon || iconLeft) && (
        <i className={`${icon || iconLeft} icon`} {...iconProps} />
      )}
    </div>

    {!!(error && showInlineError) && (
      <div className="ui red basic pointing label">{errorMessage}</div>
    )}
  </div>
);

Text.defaultProps = { type: 'text' };

export default connectField<TextFieldProps>(Text);
