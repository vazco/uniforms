import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(x).replace(/=+$/, '');

const xor = (item, array) => {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
};

export type SelectFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    disabled: boolean;
    error?: unknown;
    errorMessage?: string;
    fieldType: unknown;
    id: string;
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLSelectElement>;
    label: string;
    name: string;
    onChange(value?: string | string[]): void;
    placeholder: string;
    required?: boolean;
    showInlineError?: boolean;
    transform?(value: string): string;
    value?: string | string[];
  }
>;

function Select({
  allowedValues,
  checkboxes,
  className,
  disabled,
  error,
  errorMessage,
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
  showInlineError,
  transform,
  value,
  ...props
}: SelectFieldProps) {
  return wrapField(
    { ...props, id, label },
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
              disabled={disabled}
              id={`${id}-${escape(item)}`}
              name={name}
              onChange={() =>
                onChange(fieldType === Array ? xor(item, value) : item)
              }
              type="checkbox"
            />
            {transform ? transform(item) : item}
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
        name={name}
        onChange={event =>
          onChange(event.target.value !== '' ? event.target.value : undefined)
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
          <option key={value} value={value}>
            {transform ? transform(value) : value}
          </option>
        ))}
      </select>
    ),
  );
}

export default connectField(Select, { kind: 'leaf' });
