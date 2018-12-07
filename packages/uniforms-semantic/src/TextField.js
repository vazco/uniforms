import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const Text = ({
  className,
  disabled,
  error,
  errorMessage,
  icon,
  iconLeft,
  iconProps,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  type,
  value,
  wrapClassName,
  ...props
}) => (
  <div className={classnames(className, {disabled, error, required}, 'field')} {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <div className={classnames('ui', wrapClassName, {left: iconLeft, icon: icon || iconLeft}, 'input')}>
      <input
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        value={value}
      />

      {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
    </div>

    {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
  </div>
);
Text.defaultProps = {type: 'text'};

export default connectField(Text);
