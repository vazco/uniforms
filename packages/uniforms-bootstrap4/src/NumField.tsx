import classnames from 'classnames';
import omit from 'lodash/omit';
import React, { Ref } from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import wrapField from './wrapField';

export type NumFieldProps = HTMLFieldProps<
  number,
  HTMLDivElement,
  {
    decimal?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
  }
>;

function Num(props: NumFieldProps) {
  return wrapField(
    omit(props, ['value', 'onChange']),
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'is-invalid': props.error,
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
}

export default connectField(Num, { kind: 'leaf' });
