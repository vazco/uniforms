import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

const Date = ({
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
  max,
  min,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
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
        max={dateFormat(max)}
        min={dateFormat(min)}
        name={name}
        onChange={event => dateParse(event.target.valueAsNumber, onChange)}
        placeholder={placeholder}
        ref={inputRef}
        type="datetime-local"
        value={dateFormat(value)}
      />

      {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
    </div>

    {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
  </div>
);
export default connectField(Date);
