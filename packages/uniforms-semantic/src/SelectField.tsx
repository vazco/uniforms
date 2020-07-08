import classnames from 'classnames';
import React, { HTMLProps, ReactNode, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

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
    inputRef?: Ref<HTMLSelectElement>;
    label?: ReactNode;
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
  return (
    <div
      className={classnames({ disabled, error, required }, className, 'field')}
      {...filterDOMProps(props)}
    >
      {label && <label htmlFor={id}>{label}</label>}

      {/* TODO: Better handling of these props. */}
      {checkboxes || fieldType === Array ? (
        allowedValues?.map(item => (
          <div className="field" key={item}>
            <div className="ui checkbox">
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

              <label htmlFor={`${id}-${escape(item)}`}>
                {transform ? transform(item) : item}
              </label>
            </div>
          </div>
        ))
      ) : (
        <select
          className="ui selection dropdown"
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
      )}

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

export default connectField(Select, { kind: 'leaf' });
