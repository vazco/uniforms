import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

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

type renderProps = {
  allowedValues?: string[];
  disabled: boolean;
  fieldType?: unknown;
  id: string;
  inputClassName?: string;
  name: string;
  onChange: (value?: string | string[]) => void;
  transform?: (value?: string) => string;
  value?: string | string[];
} & HTMLProps<HTMLDivElement>;

type renderCheckboxesProps = { inline?: string } & renderProps;

type renderSelectProps = {
  error?: string;
  inputRef?: Ref<HTMLSelectElement>;
  label: string;
  placeholder: string;
  required?: boolean;
} & renderProps;

type SelectFieldProps = {
  checkboxes?: boolean;
  error: unknown;
  errorMessage: string;
  inputRef?: Ref<HTMLSelectElement>;
  label: string;
  placeholder: string;
  required?: boolean;
  showInlineError: boolean;
} & (renderCheckboxesProps | renderSelectProps);

const renderCheckboxes = ({
  allowedValues,
  disabled,
  fieldType,
  id,
  inline,
  inputClassName,
  name,
  onChange,
  transform,
  value,
}: renderCheckboxesProps) =>
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
          checked={fieldType === Array ? value?.includes(item) : value === item}
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
  ));

const renderSelect = ({
  allowedValues,
  disabled,
  error,
  id,
  inputClassName,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  transform,
  value,
}: renderSelectProps) => (
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
    {(!!placeholder || !required || value === '') && (
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
);

const Select = ({
  allowedValues,
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
  required,
  showInlineError,
  transform,
  value,
  ...props
}: SelectFieldProps) =>
  wrapField(
    { ...props, id, label },
    checkboxes || fieldType === Array
      ? renderCheckboxes({
          allowedValues,
          disabled,
          id,
          name,
          onChange,
          transform,
          value,
          fieldType,
        })
      : renderSelect({
          allowedValues,
          disabled,
          id,
          name,
          onChange,
          transform,
          value,
          inputRef,
          label,
          placeholder,
          required,
        }),
  );

export default connectField(Select);
