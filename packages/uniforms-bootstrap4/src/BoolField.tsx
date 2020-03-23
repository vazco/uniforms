import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

type BoolFieldProps = {
  labelBefore: string;
  inputClassName?: string;
  error?: boolean;
  onChange: (value?: boolean) => void;
  inputRef?: Ref<HTMLInputElement>;
  inline?: boolean;
  value?: boolean;
  disabled?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'value'>;

const Bool = ({
  label,
  labelBefore,
  inputClassName,
  disabled,
  name,
  error,
  inputRef,
  value,
  onChange,
  inline,
  ...props
}: BoolFieldProps) =>
  wrapField(
    { label: labelBefore, ...props },
    <div
      className={classnames(inputClassName, 'form-check', 'checkbox', {
        'text-danger': error,
        'custom-control-inline': inline,
      })}
    >
      <label htmlFor={props.id} className="form-check-label">
        <input
          checked={value}
          className="form-check-input"
          disabled={disabled}
          id={props.id}
          name={name}
          onChange={() => onChange(!value)}
          ref={inputRef}
          type="checkbox"
        />
        &nbsp;
        {label}
      </label>
    </div>,
  );

export default connectField(Bool);
