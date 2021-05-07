import classnames from 'classnames';
import xor from 'lodash/xor';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

const base64: typeof btoa =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

const selectStyle = { paddingBottom: 0, paddingTop: 0 };

export type SelectFieldProps = HTMLFieldProps<
  string | string[],
  HTMLDivElement,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    disableItem?: (value: string) => boolean;
    inputRef?: Ref<HTMLSelectElement>;
    transform?: (value: string) => string;
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
  readOnly,
  required,
  showInlineError,
  transform,
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
        allowedValues?.map(item => (
          <div className="field" key={item}>
            <div className="ui checkbox">
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

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
