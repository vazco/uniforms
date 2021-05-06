import classnames from 'classnames';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = HTMLFieldProps<
  boolean,
  HTMLDivElement,
  {
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    labelBefore?: string;
  }
>;

function Bool({ onChange, ...props }: BoolFieldProps) {
  const {
    disabled,
    error,
    inline,
    inputClassName,
    inputRef,
    label,
    labelBefore,
    name,
    readOnly,
    value,
  } = props;
  return wrapField(
    { ...props, label: labelBefore, value: props.value },
    <div
      className={classnames(inputClassName, 'form-check', {
        'text-danger': error,
        'text-success': !error && props.changed,
        'form-check-inline': inline,
      })}
    >
      <input
        checked={value || false}
        className="form-check-input"
        disabled={disabled}
        id={props.id}
        name={name}
        onChange={() => {
          if (!readOnly) {
            onChange(!value);
          }
        }}
        ref={inputRef}
        type="checkbox"
      />
      <label htmlFor={props.id} className="form-check-label">
        {label}
      </label>
    </div>,
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
