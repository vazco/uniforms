import React          from 'react';
import classnames     from 'classnames';
import autoid         from '../../autoid';
import {connectField} from 'uniforms';

// eslint-disable-next-line max-len
const LongText = props => {
  const { field: { allowedValues} } = props;
  console.log('LongText (WIP)', props);
  const idNice = autoid(props.id);
  return (
    <FormGroup id={idNice} {...props}>
      <textarea
        className={classnames(
          props.inputClassName,
          'form-control',
          (props.error ? 'form-control-danger' : ''),
        )}
        disabled={props.disabled}
        name={props.name}
        id={idNice}
        onChange={event => props.onChange(event.target.value)}
        placeholder={placeholder}
        value={props.value}
        type="text"
        {...props}
      />
    </FormGroup>
  );
};

export default connectField(LongText);

