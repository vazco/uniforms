import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

const Bool = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  required,
  showInlineError,
  value,
  wrapClassName,
  ...props
}) => (
  <div
    className={classnames(className, { disabled, error, required }, 'field')}
    {...filterDOMProps(props)}
  >
    <div
      className={classnames(
        'ui',
        wrapClassName,
        !label && 'fitted',
        'checkbox',
      )}
    >
      <input
        checked={value}
        className="hidden"
        disabled={disabled}
        id={id}
        name={name}
        onChange={() => onChange(!value)}
        ref={inputRef}
        type="checkbox"
      />

      {!!label && <label htmlFor={id}>{label}</label>}
    </div>

    {!!(error && showInlineError) && (
      <div>
        <div className="ui red basic pointing label">{errorMessage}</div>
      </div>
    )}
  </div>
);

export default connectField(Bool);
