import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const LongText = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  value,
  ...props
}) => (
  <div className={classnames(className, {disabled, error, required}, 'field')} {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <textarea
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value}
    />

    {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
  </div>
);
export default connectField(LongText);
