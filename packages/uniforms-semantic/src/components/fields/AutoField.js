import {connectField}  from 'uniforms';
import {createElement} from 'react';

import NumField    from './NumField';
import BoolField   from './BoolField';
import DateField   from './DateField';
import ListField   from './ListField';
import NestField   from './NestField';
import TextField   from './TextField';
import SelectField from './SelectField';

// eslint-disable-next-line complexity
const Auto = props => {
    let component;

    let uniforms = props.field.uniforms;
    if (uniforms) {
        if (typeof uniforms === 'string' ||
            typeof uniforms === 'function') {
            component = uniforms;
        }

        if (typeof uniforms.component === 'string' ||
            typeof uniforms.component === 'function') {
            component = uniforms.component;
        }
    }

    if (component === undefined) {
        if (props.field.allowedValues) {
            component = SelectField;
        } else {
            switch (props.field.type) {
                case Date:    component = DateField; break;
                case Array:   component = ListField; break;
                case Number:  component = NumField;  break;
                case Object:  component = NestField; break;
                case String:  component = TextField; break;
                case Boolean: component = BoolField; break;

                default: throw new Error(`Unsupported field type: ${props.field.type.toString()}`);
            }
        }
    }

    return createElement(component, props);
};

export default connectField(Auto, {includeInChain: false});
