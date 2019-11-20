import React, { Component } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';

const noneIfNaN = x => (isNaN(x) ? undefined : x);
const parse = (decimal, x) => noneIfNaN((decimal ? parseFloat : parseInt)(x));

const Num_ = ({
  className,
  decimal,
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
  step,
  value,
  wrapClassName,
  ...props
}) => (
  <div
    className={classnames(className, { disabled, error, required }, 'field')}
    {...filterDOMProps(props)}
  >
    {label && <label htmlFor={id}>{label}</label>}

    <div
      className={classnames(
        'ui',
        wrapClassName,
        { left: iconLeft, icon: icon || iconLeft },
        'input',
      )}
    >
      <input
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        step={step || (decimal ? 0.01 : 1)}
        type="number"
        value={value}
      />

      {(icon || iconLeft) && (
        <i className={`${icon || iconLeft} icon`} {...iconProps} />
      )}
    </div>

    {!!(error && showInlineError) && (
      <div className="ui red basic pointing label">{errorMessage}</div>
    )}
  </div>
);

let Num;
// istanbul ignore next
if (parseInt(React.version, 10) < 16) {
  Num = class Num extends Component<any, any> {
    state = { value: '' + this.props.value };

    componentWillReceiveProps({ decimal, value }) {
      if (
        parse(decimal, value) !==
        parse(decimal, this.state.value.replace(/[.,]+$/, ''))
      ) {
        this.setState({
          value: value === undefined || value === '' ? '' : '' + value,
        });
      }
    }

    onChange = event => {
      const value = event.target.value.replace(/[^\d.,-]/g, '');

      this.setState({ value });
      this.props.onChange(parse(this.props.decimal, value));
    };

    render() {
      return Num_({
        ...this.props,
        onChange: this.onChange,
        value: this.state.value,
      } as any);
    }
  };
} else {
  Num = props =>
    Num_({
      ...props,
      onChange(event) {
        props.onChange(parse(props.decimal, event.target.value));
      },
    });
}

export default connectField(Num);
