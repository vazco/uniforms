import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

const TextField = props => {
  console.log('TextField (WIP)', props);
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
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
      />
    </FormGroup>
  )
;
}

export default connectField(TextField);
