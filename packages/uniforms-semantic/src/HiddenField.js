import BaseField      from 'uniforms/BaseField';
import React          from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';
import nothing        from 'uniforms/nothing';

export default class HiddenField extends BaseField {
    componentWillReceiveProps ({value: valueDesired}) {
        if (valueDesired === undefined) {
            return;
        }

        const props = this.getFieldProps(undefined, {overrideValue: true});
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
