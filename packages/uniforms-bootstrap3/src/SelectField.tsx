import React from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

const base64 =
  typeof btoa !== 'undefined'
    ? btoa
    : (x: string) => Buffer.from(x).toString('base64');
const escape = (x: string) => base64(x).replace(/=+$/, '');

const xor = (item, array) => {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = props =>
  props.allowedValues.map(item => (
    <div
      key={item}
      className={classnames(
        props.inputClassName,
        `checkbox${props.inline ? '-inline' : ''}`,
      )}
    >
      <label htmlFor={`${props.id}-${escape(item)}`}>
        <input
          checked={
            props.fieldType === Array
              ? props.value.includes(item)
              : props.value === item
          }
          disabled={props.disabled}
          id={`${props.id}-${escape(item)}`}
          name={props.name}
          onChange={() =>
            props.onChange(
              props.fieldType === Array ? xor(item, props.value) : item,
            )
          }
          type="checkbox"
        />
        {props.transform ? props.transform(item) : item}
      </label>
    </div>
  ));

const renderSelect = props => (
  <select
    className={classnames(props.inputClassName, 'form-control', {
      'form-control-danger': props.error,
    })}
    disabled={props.disabled}
    id={props.id}
    name={props.name}
    onChange={event =>
      props.onChange(event.target.value !== '' ? event.target.value : undefined)
    }
    ref={props.inputRef}
    value={props.value}
  >
    {(!!props.placeholder || !props.required || props.value === '') && (
      <option value="" disabled={props.required} hidden={props.required}>
        {props.placeholder || props.label}
      </option>
    )}

    {props.allowedValues.map(value => (
      <option key={value} value={value}>
        {props.transform ? props.transform(value) : value}
      </option>
    ))}
  </select>
);

const Select = props =>
  wrapField(
    props,
    props.checkboxes || props.fieldType === Array
      ? renderCheckboxes(props)
      : renderSelect(props),
  );

export default connectField(Select);
