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
  disabled,
  label,
  inline,
  inputClassName,
  onChange,
  labelBefore,
  value,
  ...props
}: BoolFieldProps) =>
  wrapField(
    { label: labelBefore, ...props },
    <div
      className={classnames(
        inputClassName,
        `checkbox${inline ? '-inline' : ''}`,
      )}
    >
      <label htmlFor={props.id}>
        <input
          checked={value}
          disabled={disabled}
          id={props.id}
          name={name}
          onChange={() => onChange(!value)}
          ref={props.inputRef}
          type="checkbox"
        />
        &nbsp;
        {label}
      </label>
    </div>,
  );

export default connectField(Bool);
