import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';

import type { Option } from './types';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    checkboxes?: boolean;
    inputRef?: Ref<HTMLSelectElement>;
    options?: Option<string>[];
  }
>;

function Select({
  checkboxes,
  disabled,
  fieldType,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  value,
  options,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}
      {checkboxes ? (
        options?.map(option => (
          <div key={option.key ?? option.value}>
            <input
              checked={
                fieldType === Array
                  ? value?.includes(option.value)
                  : value === option.value
              }
              disabled={option.disabled ?? disabled}
              id={`${id}-${option.key ?? escape(option.value)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(
                    fieldType === Array
                      ? xor([option.value], value)
                      : option.value,
                  );
                }
              }}
              type="checkbox"
            />

            <label htmlFor={`${id}-${option.key ?? escape(option.value)}`}>
              {option.label ?? option.value}
            </label>
          </div>
        ))
      ) : (
        <select
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
              key={option.key ?? option.value}
              value={option.value}
            >
              {option.label ?? option.value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
