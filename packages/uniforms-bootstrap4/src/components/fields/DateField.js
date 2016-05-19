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

const Date_ = props => {
  console.log('DateField (WIP)', props);
  const idNice = autoid(props.id);
  return (
    <FormGroup id={idNice} {...props}>
      <input
        className={classnames(
          props.inputClassName,
          'form-control',
          {'form-control-danger': props.error}
        )}
        disabled={props.disabled}
        name={props.name}
        id={idNice}
        max={dateFormat(props.max)}
        min={dateFormat(props.min)}
        onChange={event => dateParse(event.target.valueAsNumber, props.onChange)}
        type="datetime-local"
        value={dateFormat(props.value)}
      />
    </FormGroup>
  );
};

Date_.displayName = 'Date';

export default connectField(Date_);
