import classnames from 'classnames';
import omit from 'lodash/omit';
import React from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    transform?(value: string): string;
  }
>;

function Radio({
  allowedValues,
  className,
  disabled,
  error,
  errorMessage,
  id,
  label,
  name,
  onChange,
  required,
  showInlineError,
  transform,
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

      {allowedValues?.map(item => (
        <div className="field" key={item}>
          <div className="ui radio checkbox">
            <input
              checked={item === value}
              disabled={disabled}
              id={`${id}-${escape(item)}`}
              name={name}
              onChange={() => onChange(item)}
              type="radio"
            />

            <label htmlFor={`${id}-${escape(item)}`}>
              {transform ? transform(item) : item}
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

export default connectField(Radio, { kind: 'leaf' });
