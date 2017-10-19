import connectField     from 'uniforms/connectField';
import filterDOMProps   from 'uniforms/filterDOMProps';
import React            from 'react';
import TextField        from 'material-ui/TextField';
import {Component}      from 'react';

import wrapField from './wrapField';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num_ = props => wrapField(props, (
    <TextField
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        error={!!props.error}
        FormHelperTextProps={props.FormHelperTextProps}
        fullWidth={props.fullWidth}
        helperText={props.error && props.showInlineError ? props.errorMessage : props.helperText}
        helperTextClassName={props.helperTextClassName}
        InputProps={props.InputProps}
        inputProps={{...props.inputProps, id: props.id}}
        inputRef={props.inputRef}
        label={props.label}
        margin={props.margin}
        onChange={event => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        type="number"
        value={props.value}
        {...filterDOMProps(props)}
    />
));

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

Num.defaultProps = {
    fullWidth: true,
    margin: 'normal'
};

export default connectField(Num);
