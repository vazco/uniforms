import classnames from 'classnames';
import omit from 'lodash/omit';
import React from 'react';
import { connectField, filterDOMProps, HTMLFieldProps, Option } from 'uniforms';

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ x => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  {
    options?: Option<string>[];
    checkboxes?: boolean;
  }
>;

function Radio({
  options,
  className,
  disabled,
  error,
  errorMessage,
  id,
  label,
  name,
  onChange,
  readOnly,
  required,
  showInlineError,
  value,
  ...props
}: RadioFieldProps) {
  return (
    <div
      className={classnames(className, { disabled, error }, 'grouped fields')}
      {...omit(filterDOMProps(props), ['checkboxes'])}
    >
      {label && (
        <div className={classnames({ required }, 'field')}>
          <label>{label}</label>
        </div>
      )}

      {options?.map(option => (
        <div className="field" key={option.key}>
          <div className="ui radio checkbox">
            <input
              checked={option.value === value}
              disabled={option.disabled || disabled}
              id={`${id}-${escape(option.key)}`}
              name={name}
              onChange={() => {
                if (!readOnly) {
                  onChange(option.value);
                }
              }}
              type="radio"
            />

            <label htmlFor={`${id}-${escape(option.key)}`}>
              {option.label}
            </label>
          </div>
        </div>
      ))}

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
