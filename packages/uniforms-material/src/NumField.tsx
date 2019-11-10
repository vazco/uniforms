import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connectField, filterDOMProps } from 'uniforms';

const noneIfNaN = x => (isNaN(x) ? undefined : x);
const parse = (decimal, x) => noneIfNaN((decimal ? parseFloat : parseInt)(x));

const Num_ = ({
  decimal,
  disabled,
  error,
  errorMessage,
  helperText,
  inputProps,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  showInlineError,
  value,
  ...props
}) => (
  <TextField
    disabled={!!disabled}
    error={!!error}
    helperText={(error && showInlineError && errorMessage) || helperText}
    inputProps={{ min, max, step: decimal ? 0.01 : 1, ...inputProps }}
    label={label}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    ref={inputRef}
    type="number"
    value={value}
    {...filterDOMProps(props)}
  />
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

Num.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField(Num);
