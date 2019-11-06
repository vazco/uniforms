import React, { Component } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

const noneIfNaN = x => (isNaN(x) ? undefined : x);
const parse = (decimal, x) => noneIfNaN((decimal ? parseFloat : parseInt)(x));

const Num_ = ({
  decimal,
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  step,
  value,
  ...props
}) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

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
