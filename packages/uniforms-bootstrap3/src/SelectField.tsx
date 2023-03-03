import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps, Option } from 'uniforms';

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
    options?: Option<string>[];
    checkboxes?: boolean;
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLSelectElement>;
  }
>;

function Select({
  options,
  checkboxes,
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
  value,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;
  return wrapField(
    { ...props, id, label },
    checkboxes ? (
      options?.map(item => (
        <div
          key={item.key}
          className={classnames(
            inputClassName,
            `checkbox${inline ? '-inline' : ''}`,
          )}
        >
          <label htmlFor={`${id}-${escape(item.key)}`}>
            <input
              checked={
                fieldType === Array
                  ? value?.includes(item.value)
                  : value === item.value
              }
              disabled={item.disabled || disabled}
              id={`${id}-${escape(item.key)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(
                    fieldType === Array ? xor([item.value], value) : item.value,
                  );
                }
              }}
              type="checkbox"
            />
            {item.label}
          </label>
        </div>
      ))
    ) : (
      <select
        className={classnames(inputClassName, 'form-control', {
          'form-control-danger': error,
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

        {options?.map(option => (
          <option
            disabled={option.disabled}
            key={option.key}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
