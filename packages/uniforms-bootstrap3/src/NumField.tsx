import React, { HTMLProps, Ref } from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

type NumFieldProps = {
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: number) => void;
  inputClassName?: string;
  decimal?: boolean;
  error?: boolean;
  value?: number;
} & HTMLProps<HTMLDivElement>;

const Num = (props: NumFieldProps) =>
  wrapField(
    props,
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'form-control-danger': props.error,
      })}
      disabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={event => {
        const parse = props.decimal ? parseFloat : parseInt;
        const value = parse(event.target.value);
        props.onChange(isNaN(value) ? undefined : value);
      }}
      placeholder={props.placeholder}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      type="number"
      value={props.value ?? ''}
    />,
  );

export default connectField<NumFieldProps>(Num);
