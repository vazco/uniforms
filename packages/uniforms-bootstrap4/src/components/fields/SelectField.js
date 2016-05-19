import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import buildOptions   from '../../buildOptions';
import FormGroup      from './FormGroup';

// eslint-disable-next-line max-len
const SelectField = props => {
  const { field: { allowedValues} } = props;
  const idNice = autoid(props.id);
  const options = buildOptions(props);
  console.log('SelectField (WIP)', props, options);
  return (
    <FormGroup id={idNice} {...props}>
      <select
        className={classnames(
          props.inputClassName,
          'c-select',
          'form-control',
          (props.error ? 'form-control-danger' : ''),
        )}
        disabled={props.disabled}
        name={props.name}
        id={idNice}
        onChange={event => props.onChange(event.target.value)}
        value={props.value}
        {...props}
      >
        {props.placeholder && (
          <option value="" disabled hidden>
            {props.placeholder}
          </option>
        )}

        {options && Object.keys(options).map(value => {
          const label = options[value];
          return <option key={value} value={value}>{label ? label : value}</option>
        })}
      </select>
    </FormGroup>
  );
};

export default connectField(SelectField);

