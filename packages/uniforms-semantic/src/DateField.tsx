import classnames from 'classnames';
import React, { Ref } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

type DateFieldType = 'date' | 'datetime-local';

/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date, type: DateFieldType = 'datetime-local') =>
  value?.toISOString().slice(0, type === 'datetime-local' ? -8 : -14);

export type DateFieldProps = HTMLFieldProps<
  Date,
  HTMLDivElement,
  {
    icon?: string;
    iconLeft?: string;
    iconProps?: object;
    inputRef?: Ref<HTMLInputElement>;
    max?: Date;
    min?: Date;
    wrapClassName?: string;
    type?: DateFieldType;
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
  readOnly,
  required,
  showInlineError,
  value,
  wrapClassName,
  type = 'datetime-local',
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
          readOnly={readOnly}
          ref={inputRef}
          type={type}
          value={dateFormat(value, type) ?? ''}
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

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
