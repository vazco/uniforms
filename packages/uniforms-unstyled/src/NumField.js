import React          from 'react';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import {Component}    from 'react';

const noneIfNaN = x => isNaN(x) ? undefined : x;

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
}) =>
    <div {...filterDOMProps(props)}>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

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
;

// NOTE: React < 16 workaround. Make it optional?
class Num extends Component {
    constructor () {
        super(...arguments);

        this.state = {value: '' + this.props.value};

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps ({decimal, value}) {
        const parse = decimal ? parseFloat : parseInt;

        if (noneIfNaN(parse(value)) !== noneIfNaN(parse(this.state.value.replace(/[.,]+$/, '')))) {
            this.setState({value: value === undefined || value === '' ? '' : '' + value});
        }
    }

    onChange ({target: {value}}) {
        const change = value.replace(/[^\d.,-]/g, '');

        this.setState({value: change});
        this.props.onChange(noneIfNaN((this.props.decimal ? parseFloat : parseInt)(change)));
    }

    render () {
        return Num_({...this.props, onChange: this.onChange, value: this.state.value});
    }
}

export default connectField(Num);
