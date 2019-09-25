import React, { Component } from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const noneIfNaN = (x: any) => (isNaN(x) ? undefined : x);
const parse = (decimal: any, x: any) => noneIfNaN((decimal ? parseFloat : parseInt)(x));

const Num_ = (props: any) =>
  wrapField(
    props,
    <input
      className={classnames(props.inputClassName, 'form-control', {
        'form-control-danger': props.error
      })}
      disabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      type="number"
      value={props.value}
    />
  );

let Num;
// istanbul ignore next
if (parseInt(React.version, 10) < 16) {
  Num = class Num extends Component {
    // @ts-ignore
    state = { value: '' + this.props.value };

    componentWillReceiveProps({ decimal, value }: any) {
      if (
        parse(decimal, value) !==
        parse(decimal, this.state.value.replace(/[.,]+$/, ''))
      ) {
        this.setState({
          value: value === undefined || value === '' ? '' : '' + value
        });
      }
    }

    onChange = (event: any) => {
      const value = event.target.value.replace(/[^\d.,-]/g, '');

      this.setState({ value });
      // @ts-ignore
      this.props.onChange(parse(this.props.decimal, value));
    };

    render() {
      return Num_({
        ...this.props,
        onChange: this.onChange,
        value: this.state.value
      });
    }
  };
} else {
  Num = (props: any) =>
    Num_({
      ...props,
      onChange(event: any) {
        props.onChange(parse(props.decimal, event.target.value));
      }
    });
}

export default connectField(Num);
