import connectField                  from 'uniforms/connectField';
import filterDOMProps                from 'uniforms/filterDOMProps';
import React                         from 'react';
import TextField                     from 'material-ui/TextField';
import {Component}                   from 'react';
import {FormControl, FormHelperText} from 'material-ui/Form';

const noneIfNaN = x => isNaN(x) ? undefined : x;

const Num_ = ({disabled, label, onChange, placeholder, value, ...props}) => (
    <FormControl disabled={disabled} error={!!props.error} required={props.required}>
        <TextField
            disabled={disabled}
            label={label}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            type="number"
            value={value}
            {...filterDOMProps(props)}
        />
        {props.error && props.showInlineError && <FormHelperText>{props.errorMessage}</FormHelperText>}
    </FormControl>
);

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
