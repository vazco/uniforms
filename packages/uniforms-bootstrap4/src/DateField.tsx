import classnames from 'classnames';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

type DateFieldType = 'date' | 'datetime-local';

/* istanbul ignore next */
const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date, type: DateFieldType = 'datetime-local') =>
  value?.toISOString().slice(0, type === 'datetime-local' ? -8 : -14);

export type DateFieldProps = HTMLFieldProps<
  Date,
  HTMLDivElement,
  {
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    max?: Date;
    min?: Date;
    wrapClassName?: string;
    type?: DateFieldType;
  }
>;

function Date({
  disabled,
  error,
  id,
  inputClassName,
  inputRef,
  max,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
  type = 'datetime-local',
  ...props
}: DateFieldProps) {
  return wrapField(
    { ...props, id },
    <input
      className={classnames(inputClassName, 'form-control', {
        'is-invalid': error,
        'is-valid': !error && props.changed,
      })}
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
    />,
  );
}

export default connectField<DateFieldProps>(Date, { kind: 'leaf' });
