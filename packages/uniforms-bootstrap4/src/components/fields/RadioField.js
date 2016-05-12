import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

// eslint-disable-next-line max-len
const Select = ({
  field: {allowedValues, inline, optional},
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);
  return (
    <FormGroup id={idNice} {...props}>
      {allowedValues.map(item =>
        <div
          className={classnames((inline ? 'radio-inline' : 'radio'))}
          key={item}
        >
          <label>
            <input
              checked={item === value}
              disabled={disabled}
              name={name}
              onChange={() => onChange(item)}
              type="radio"
            />
            {item}
          </label>
        </div>
      )}
    </FormGroup>
  );
};

export default connectField(Select);

