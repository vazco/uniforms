import React from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

const Radio = props =>
  wrapField(
    props,
    props.allowedValues.map(item => (
      <div
        key={item}
        className={classnames(
          props.inputClassName,
          `radio${props.inline ? '-inline' : ''}`,
        )}
      >
        <label htmlFor={`${props.id}-${item}`}>
          <input
            checked={item === props.value}
            disabled={props.disabled}
            id={`${props.id}-${item}`}
            name={props.name}
            onChange={() => props.onChange(item)}
            type="radio"
          />
          {props.transform ? props.transform(item) : item}
        </label>
      </div>
    )),
  );

export default connectField(Radio);
