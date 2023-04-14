import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import type { Option } from './types';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

const selectStyle = { paddingBottom: 0, paddingTop: 0 };

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    options?: Option<string>[];
    checkboxes?: boolean;
    inputRef?: Ref<HTMLSelectElement>;
  }
>;

function Select({
  options,
  checkboxes,
  className,
  disabled,
  error,
  errorMessage,
  fieldType,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  showInlineError,
  value,
  ...props
}: SelectFieldProps) {
  const multiple = fieldType === Array;
  return (
    <div
      className={classnames({ disabled, error, required }, className, 'field')}
      {...filterDOMProps(props)}
    >
      {label && <label htmlFor={id}>{label}</label>}

      {/* TODO: Better handling of these props. */}
      {checkboxes ? (
        options?.map(option => (
          <div className="field" key={option.key ?? option.value}>
            <div className="ui checkbox">
              <input
                checked={
                  multiple
                    ? value?.includes(option.value)
                    : value === option.value
                }
                disabled={option.disabled || disabled}
                id={`${id}-${option.key ?? escape(option.value)}`}
                name={name}
                onChange={() => {
                  if (!readOnly) {
                    onChange(
                      multiple ? xor([option.value], value) : option.value,
                    );
                  }
                }}
                type="checkbox"
              />

              <label htmlFor={`${id}-${option.key ?? escape(option.value)}`}>
                {option.label ?? option.value}
              </label>
            </div>
          </div>
        ))
      ) : (
        <select
          className="ui selection dropdown"
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
          style={selectStyle}
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

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
