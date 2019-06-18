import Input from 'antd/lib/input';
import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import wrapField from './wrapField';

// NOTE: Input.TextArea was introduced in 2.12.0 and removed in 3.0.0.
const TextArea = Input.TextArea || Input;
const textType = Input.TextArea ? undefined : 'textarea';

const LongText = props =>
  wrapField(
    props,
    <TextArea
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={textType}
      value={props.value}
      {...filterDOMProps(props)}
    />
  );
LongText.defaultProps = { rows: 5 };

export default connectField(LongText);
