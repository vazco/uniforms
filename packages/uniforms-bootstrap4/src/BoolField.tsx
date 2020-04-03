import classnames from 'classnames';
import React, { HTMLProps, Ref } from 'react';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled?: boolean;
    error?: boolean;
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    labelBefore: string;
    onChange: (value?: boolean) => void;
    value?: boolean;
  }
>;

const Bool = ({ onChange, ...props }: BoolFieldProps) => {
  const {
    disabled,
    error,
    inline,
    inputClassName,
    inputRef,
    label,
    labelBefore,
    name,
    value,
  } = props;
  return wrapField(
    { ...props, label: labelBefore, value: props.value },
    <div
      className={classnames(inputClassName, 'form-check', 'checkbox', {
        'text-danger': error,
        'custom-control-inline': inline,
      })}
    >
      <label htmlFor={props.id} className="form-check-label">
        <input
          checked={value || false}
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
};

export default connectField(Bool);
