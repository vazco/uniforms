import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    disableItem?: (value: string) => boolean;
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLSelectElement>;
    transform?(value: string): string;
  }
>;

function Select({
  allowedValues,
  checkboxes,
  disableItem,
  disabled,
  error,
  fieldType,
  id,
  inline,
  inputClassName,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  transform,
  value,
  ...props
}: SelectFieldProps) {
  return wrapField(
    {
      ...props,
      disabled,
      error,
      id,
      label,
      required,
    },
    checkboxes || fieldType === Array ? (
      allowedValues?.map(item => (
        <div
          key={item}
          className={classnames(
            inputClassName,
            `checkbox${inline ? '-inline' : ''}`,
          )}
        >
          <label htmlFor={`${id}-${escape(item)}`}>
            <input
              checked={
                fieldType === Array ? value?.includes(item) : value === item
              }
              disabled={disableItem?.(item) || disabled}
              id={`${id}-${escape(item)}`}
              name={name}
              onChange={() =>
                readOnly
                  ? undefined
                  : onChange(fieldType === Array ? xor([item], value) : item)
              }
              type="checkbox"
            />
            {transform ? transform(item) : item}
          </label>
        </div>
      ))
    ) : (
      <select
        className={classnames(inputClassName, 'c-select form-control', {
          'is-invalid': error,
        })}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event =>
          readOnly
            ? undefined
            : onChange(
                event.target.value !== '' ? event.target.value : undefined,
              )
        }
        ref={inputRef}
        value={value ?? ''}
      >
        {(!!placeholder || !required || value === undefined) && (
          <option value="" disabled={required} hidden={required}>
            {placeholder || label}
          </option>
        )}

        {allowedValues?.map(value => (
          <option disabled={disableItem?.(value)} key={value} value={value}>
            {transform ? transform(value) : value}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField(Select, { kind: 'leaf' });
