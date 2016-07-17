import {createElement} from 'react';

import BaseField from '../components/fields/BaseField';

export default function connectField (component, {
    mapProps  = x => x,
    baseField = BaseField,

    initialValue   = true,
    includeParent  = false,
    includeInChain = true
} = {}) {
    return class extends baseField {
        static displayName = `${baseField.displayName || baseField.name}(${component.displayName || component.name})`;

        getChildContextName () {
            return includeInChain ? super.getChildContextName() : this.context.uniforms.name;
        }

        render () {
            return createElement(component, mapProps(this.getFieldProps(undefined, {includeParent})));
        }

        componentWillMount () {
            if (initialValue) {
                let props = this.getFieldProps(undefined, {explicitInitialValue: true, includeParent: false});

                // https://github.com/vazco/uniforms/issues/52
                // If field is initially rendered with value, we treat it as an initial value.
                if (this.props.value !== undefined) {
                    props.onChange(this.props.value);
                    return;
                }

                if (props.value === undefined && props.required) {
                    props.onChange(props.initialValue);
                }
            }
        }
    };
}
