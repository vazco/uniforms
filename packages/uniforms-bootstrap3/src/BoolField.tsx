import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField, Override } from 'uniforms';
import omit from 'lodash/omit';

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

const Bool = (props: BoolFieldProps) => {
  const {
    disabled,
    label,
    inline,
    inputClassName,
    onChange,
    name,
    labelBefore,
    value,
  } = props;
  return wrapField(
    { ...omit(props, ['value', 'onChange']), label: labelBefore },
    <div
      className={classnames(
        inputClassName,
        `checkbox${inline ? '-inline' : ''}`,
      )}
    >
      <label htmlFor={props.id}>
        <input
          checked={value || false}
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
};

export default connectField(Bool);
