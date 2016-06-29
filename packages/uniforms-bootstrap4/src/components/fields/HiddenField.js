import React       from 'react';
import {BaseField} from 'uniforms';
import {nothing}   from 'uniforms';

export default class HiddenField extends BaseField {
    componentWillReceiveProps ({value: valueDesired}) {
        let props = this.getFieldProps(undefined, {overrideValue: true});
        if (props.value !== valueDesired) {
            props.onChange(valueDesired);
        }
    }

    render () {
        const props = this.getFieldProps();

        return (
            props.noDOM ? nothing : (
                <input
                    disabled={props.disabled}
                    id={props.id}
                    name={props.name}
                    type="hidden"
                    value={props.value}
                />
            )
        );
    }
}
