import React          from 'react';
import classnames     from 'classnames';
import autoid         from '../../autoid';
import {connectField} from 'uniforms';

// eslint-disable-next-line max-len
const LongText = ({
  field: {optional},
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);
  return (
    <FormGroup id={idNice} {...props}>
      <textarea
        disabled={disabled}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </FormGroup>
  );
};

export default connectField(LongText);

