import {createElement} from 'react';

import BaseField from '../components/fields/BaseField';

export default function connectField (component, {
    mapProps = x => x,

    baseField = BaseField,
    initialValue = true,
    includeParent = false,
    includeInChain = true
} = {}) {
    class Field extends baseField {
        getChildContextName () {
            return includeInChain ? super.getChildContextName() : this.context.uniforms.name;
        }

        render () {
            return createElement(component, mapProps(this.getFieldProps(undefined, {includeParent})));
        }

        componentDidMount () {
            if (initialValue) {
                let props = this.getFieldProps(undefined, {explicitInitialValue: true, includeParent: false});
                if (props.value === undefined && !props.field.optional) {
                    props.onChange(props.initialValue);
                }
            }
        }
    }

    Field.displayName = `${baseField.displayName || baseField.name}(${component.displayName || component.name})`;

    return Field;
}
