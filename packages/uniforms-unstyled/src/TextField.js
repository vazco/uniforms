import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import {Component} from 'react';

const Text_ = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  ...props
}) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}

    <input
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
    />
  </div>
);

Text_.defaultProps = { type: 'text' };

// NOTE: React < 16 workaround. Make it optional?
class Text extends Component {
  constructor() {
    super(...arguments);

    this.state = {value: '' + this.props.value};

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps({value}) {
    this.setState({value: value === undefined || value === '' ? '' : '' + value});
  }

  onChange({target: {value}}) {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    return Text_({...this.props, onChange: this.onChange, value: this.state.value});
  }
}

export default connectField(Text);
