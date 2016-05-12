import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
    let date = new Date(timestamp);
    if (date.getFullYear() < 10000) {
        onChange(date);
    }
};

const Date_ = ({
  disabled, error, schema,
  field: {max, min, optional},
  label, name, id,  value,
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
        max={dateFormat(max)}
        min={dateFormat(min)}
        name={name}
        id={idNice}
        onChange={event => dateParse(event.target.valueAsNumber, onChange)}
        type="datetime-local"
        value={dateFormat(value)}
      />
    </FormGroup>
  );
};

Date_.displayName = 'Date';

export default connectField(Date_);
