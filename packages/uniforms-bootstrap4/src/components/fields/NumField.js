import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

// eslint-disable-next-line max-len
const Num = ({
  field: {decimal, max, min, optional},
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);
  return (
    <FormGroup id={idNice} {...props}>
      <input
        className={classnames(
          inputClassName,
          'form-control',
          // (error ? 'form-control-danger' : ''),
        )}
        disabled={disabled}
        max={max}
        min={min}
        name={name}
        onChange={event => onChange((decimal ? parseFloat : parseInt)(event.target.value) || undefined)}
        placeholder={placeholder}
        step={decimal ? 0.01 : 1}
        type="number"
        value={value === undefined ? null : value}
      />
    </FormGroup>
  );
};

export default connectField(Num);
