import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

const Bool = ({
  field: {inline, optional},
  disabled, error, schema,
  label, name, id,  value,
  placeholder,
  inputClassName,
  onChange, ...props
}) => {
  const idNice = autoid(id);
  return (
    <FormGroup id={idNice} {...props}>
      <div
        className={classnames((inline ? 'checkbox-inline' : 'checkbox'))}
        key={item}
      >
        <label onClick={() => onChange(!value)}>
          <input
            checked={value}
            className="hidden"
            disabled={disabled}
            name={name}
            onChange={() => onChange(!value)}
            type="checkbox"
          />
          {label}
        </label>
      </div>
    </FormGroup>
  );
};

export default connectField(Bool);

