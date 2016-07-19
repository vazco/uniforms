import React            from 'react';
import {BaseField}      from 'uniforms';
import {filterDOMProps} from 'uniforms';
import {nothing}        from 'uniforms';

export default class HiddenField extends BaseField {
    componentWillReceiveProps ({value: valueDesired}) {
        if (valueDesired === undefined) {
            return;
        }

        let props = this.getFieldProps(undefined, {overrideValue: true});
        if (props.value !== valueDesired) {
            props.onChange(valueDesired);
        }
    }

    render () {
        const props = this.getFieldProps();

        return (
            props.noDOM ? nothing : (
                <input ref={props.inputRef} type="hidden" value={props.value} {...filterDOMProps(props)} />
            )
        );
    }
}
