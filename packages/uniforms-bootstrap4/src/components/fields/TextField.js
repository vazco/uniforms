import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

const Text = ({
  field: {optional},
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);

  console.log('FormGroup (WIP need error & schema)', {
    id,
    label,
    error, schema,
  });

  return (
    <FormGroup id={idNice} {...props}>
      <input
        className={classnames(
          inputClassName,
          'form-control',
          (error ? 'form-control-danger' : ''),
        )}
        disabled={disabled}
        name={name}
        id={idNice}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </FormGroup>
  )
;
}

export default connectField(Text);
