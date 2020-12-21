import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

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
    inputRef?: Ref<HTMLSelectElement>;
    transform?(value: string): string;
  }
>;

function Select({
  allowedValues,
  checkboxes,
  className,
  disableItem,
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
                disabled={disableItem?.(item) || disabled}
                id={`${id}-${escape(item)}`}
                name={name}
                onChange={() =>
                  onChange(fieldType === Array ? xor([item], value) : item)
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
            <option disabled={disableItem?.(value)} key={value} value={value}>
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
