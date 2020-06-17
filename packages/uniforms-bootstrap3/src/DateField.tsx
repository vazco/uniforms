import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date) => value?.toISOString().slice(0, -8);

export type DateFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    error: unknown;
    id: string;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    max?: Date;
    min?: Date;
    name: string;
    onChange(value?: Date): void;
    placeholder: string;
    showInlineError: boolean;
    value?: Date;
    wrapClassName?: string;
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
  showInlineError,
  value,
  wrapClassName,
  ...props
}: DateFieldProps) {
  return wrapField(
    { ...props, id },
    <input
      className={classnames(inputClassName, 'form-control', {
        'form-control-danger': error,
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
      ref={inputRef}
      type="datetime-local"
      value={dateFormat(value) ?? ''}
    />,
  );
}

export default connectField(Date, { kind: 'leaf' });
