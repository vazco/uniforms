import classnames from 'classnames';
import React, { Ref } from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

export type BoolFieldProps = HTMLFieldProps<
  boolean,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement>; wrapClassName?: string }
>;

function Bool({
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
}: BoolFieldProps) {
  return (
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
          checked={value || false}
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
}
export default connectField(Bool, { kind: 'leaf' });
