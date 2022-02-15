import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
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
    transform?: (value: string) => string;
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
  const multiple = fieldType === Array;
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
            `form-check${inline ? ' form-check-inline' : ''}`,
          )}
        >
          <label htmlFor={`${id}-${escape(item)}`}>
            <input
              checked={multiple ? value?.includes(item) : value === item}
              disabled={disableItem?.(item) || disabled}
              id={`${id}-${escape(item)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(multiple ? xor([item], value) : item);
                }
              }}
              type="checkbox"
            />
            {transform ? transform(item) : item}
          </label>
        </div>
      ))
    ) : (
      <select
        className={classnames(inputClassName, 'form-control', {
          'is-invalid': error,
          'is-valid': !error && props.changed,
        })}
        disabled={disabled}
        id={id}
        multiple={multiple}
        name={name}
        onChange={event => {
          if (!readOnly) {
            const item = event.target.value;
            if (multiple) {
              const clear = event.target.selectedIndex === -1;
              onChange(clear ? [] : xor([item], value));
            } else {
              onChange(item !== '' ? item : undefined);
            }
          }
        }}
        ref={inputRef}
        value={value ?? ''}
      >
        {(!!placeholder || !required || value === undefined) && !multiple && (
          <option value="" disabled={required} hidden={required}>
            {placeholder || label}
          </option>
        )}

        {allowedValues?.map(allowedValue => (
          <option
            disabled={disableItem?.(allowedValue)}
            key={allowedValue}
            value={allowedValue}
          >
            {transform ? transform(allowedValue) : allowedValue}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
