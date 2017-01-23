import React        from 'react';
import classnames   from 'classnames';
import connectField from 'uniforms/connectField';

import wrapField from './wrapField';

const noneIfNaN = x => isNaN(x) ? undefined : x;

class Num extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            textValue: props.value
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange (event) {
        const {decimal, onChange} = this.props;
        this.setState({textValue:event.target.value});
        onChange(noneIfNaN((decimal ? parseFloat : parseInt)(event.target.value)));
    }
    render () {
        const {props} = this;
        const {textValue} = this.state;
        return wrapField(props, (
            <input
                className={classnames(props.inputClassName, 'form-control', {'form-control-danger': props.error})}
                disabled={props.disabled}
                id={props.id}
                max={props.max}
                min={props.min}
                name={props.name}
                onChange={this.onChange}
                placeholder={props.placeholder}
                ref={props.inputRef}
                step={props.step || (props.decimal ? 0.01 : 1)}
                type="number"
                value={textValue}
            />
        ));
    }
}

export default connectField(Num);
