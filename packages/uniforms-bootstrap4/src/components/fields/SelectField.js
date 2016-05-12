import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

// eslint-disable-next-line max-len
const Select = ({
  field: {allowedValues, optional},
  transform,
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);
  return (
    <FormGroup id={idNice} {...props}>
      <select
        className={classnames(
          inputClassName,
          'form-control',
          (error ? 'form-control-danger' : ''),
        )}
        disabled={disabled}
        name={name}
        onChange={event => onChange(event.target.value)}
        value={value}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {allowedValues.map(value =>
          <option key={value} value={value}>
            {transform ? transform(value) : value}
          </option>
        )}
      </select>
    </FormGroup>
  );
};

export default connectField(Select);

