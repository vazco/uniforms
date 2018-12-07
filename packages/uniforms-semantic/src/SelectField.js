import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

const xor = (item, array) => {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
};

const renderCheckboxes = ({allowedValues, disabled, fieldType, id, name, onChange, transform, value}) =>
  allowedValues.map(item => (
    <div className="field" key={item}>
      <div className="ui checkbox">
        <input
          checked={fieldType === Array ? value.includes(item) : value === item}
          disabled={disabled}
          id={`${id}-${item}`}
          name={name}
          onChange={() => onChange(fieldType === Array ? xor(item, value) : item)}
          type="checkbox"
        />

        <label htmlFor={`${id}-${item}`}>{transform ? transform(item) : item}</label>
      </div>
    </div>
  ));
const renderSelect = ({
  allowedValues,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  transform,
  value
}) => (
  <select
    className="ui selection dropdown"
    disabled={disabled}
    id={id}
    name={name}
    onChange={event => onChange(event.target.value)}
    ref={inputRef}
    value={value}
  >
    {(!!placeholder || !required) && (
      <option value="" disabled={required} hidden={required}>
        {placeholder ? placeholder : label}
      </option>
    )}

    {allowedValues.map(value => (
      <option key={value} value={value}>
        {transform ? transform(value) : value}
      </option>
    ))}
  </select>
);
const Select = ({
  allowedValues,
  checkboxes,
  className,
  disabled,
  error,
  errorMessage,
  fieldType,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  transform,
  value,
  ...props
}) => (
  <div className={classnames({disabled, error, required}, className, 'field')} {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    {/* TODO: Better handling of these props. */}
    {checkboxes || fieldType === Array
      ? renderCheckboxes({allowedValues, disabled, id, name, onChange, transform, value, fieldType})
      : renderSelect({
          allowedValues,
          disabled,
          id,
          name,
          onChange,
          transform,
          value,
          inputRef,
          label,
          placeholder,
          required
        })}

    {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
  </div>
);
export default connectField(Select);
