import classnames from 'classnames';
import omit from 'lodash/omit';
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

function Bool(props: BoolFieldProps) {
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
}

export default connectField(Bool, { kind: 'leaf' });
