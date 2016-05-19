import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import autoid         from '../../autoid';
import FormGroup      from './FormGroup';

const BoolField = props => {
  console.log('BoolField (WIP)', props);
  const idNice = autoid(props.id);
  return (
    <FormGroup id={idNice} {...props}>
      <div
        className={classnames(
          (inline ? 'checkbox-inline' : 'checkbox')
        )}
        key={props.item}
      >
        <label onClick={() => onChange(!props.value)}>
          <input
            checked={props.value}
            className="hidden"
            disabled={props.disabled}
            name={props.name}
            onChange={() => props.onChange(!props.value)}
            type="checkbox"
          />
          {props.label}
        </label>
      </div>
    </FormGroup>
  );
};

export default connectField(BoolField);

