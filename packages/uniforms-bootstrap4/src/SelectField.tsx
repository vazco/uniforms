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
    checkboxes ? (
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
                onChange(fieldType === Array ? xor([item], value) : item)
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
        multiple={fieldType === Array}
        name={name}
        onChange={event => {
          if (fieldType === Array) {
            return;
          }
          const item = event.target.value;
          onChange(item !== '' ? item : undefined);
        }}
        ref={inputRef}
        value={value ?? ''}
      >
        {(!!placeholder || !required || value === undefined) &&
          fieldType !== Array && (
            <option value="" disabled={required} hidden={required}>
              {placeholder || label}
            </option>
          )}

        {allowedValues?.map(allowedValue => (
          <option
            disabled={disableItem?.(allowedValue)}
            key={allowedValue}
            value={allowedValue}
            onClick={event => {
              if (fieldType === Array) {
                const item = event.currentTarget.value;
                onChange(fieldType === Array ? xor([item], value) : item);
              }
            }}
          >
            {transform ? transform(allowedValue) : allowedValue}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField(Select, { kind: 'leaf' });
