import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date) => value?.toISOString().slice(0, -8);

export type DateFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    error: unknown;
    errorMessage: string;
    icon?: string;
    iconLeft?: string;
    iconProps?: object;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label: string;
    max?: Date;
    min?: Date;
    name: string;
    onChange(value?: Date): void;
    placeholder: string;
    required?: boolean;
    showInlineError: boolean;
    value?: Date;
    wrapClassName?: string;
  }
>;

function Date({
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
  max,
  min,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  value,
  wrapClassName,
  ...props
}: DateFieldProps) {
  return (
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
          max={dateFormat(max)}
          min={dateFormat(min)}
          name={name}
          onChange={event => {
            const date = new DateConstructor(event.target.valueAsNumber);
            if (date.getFullYear() < 10000) {
              onChange(date);
            } else if (isNaN(event.target.valueAsNumber)) {
              onChange(undefined);
            }
          }}
          placeholder={placeholder}
          ref={inputRef}
          type="datetime-local"
          value={dateFormat(value) ?? ''}
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
}

export default connectField(Date, { kind: 'leaf' });
