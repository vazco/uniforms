import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, Override } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    labelBefore: string;
    inputClassName?: string;
    error?: boolean;
    onChange: (value?: boolean) => void;
    inputRef?: Ref<HTMLInputElement>;
    inline?: boolean;
    value?: boolean;
    disabled?: boolean;
  }
>;

const Bool = ({ onChange, ...props }: BoolFieldProps) => {
  const {
    label,
    labelBefore,
    inputClassName,
    disabled,
    name,
    error,
    inputRef,
    value,
    inline,
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
