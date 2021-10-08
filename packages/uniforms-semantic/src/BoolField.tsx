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
  readOnly,
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
          onChange={() => {
            if (!readOnly) {
              onChange(!value);
            }
          }}
          ref={inputRef}
          type="checkbox"
        />

        <label htmlFor={id}>{label || null}</label>
      </div>

      {!!(error && showInlineError) && (
        <div>
          <div className="ui red basic pointing label">{errorMessage}</div>
        </div>
      )}
    </div>
  );
}
export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
