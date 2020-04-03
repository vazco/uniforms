import classnames from 'classnames';
import omit from 'lodash/omit';
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

const Bool = (props: BoolFieldProps) => {
  const {
    disabled,
    inline,
    inputClassName,
    label,
    labelBefore,
    name,
    onChange,
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
