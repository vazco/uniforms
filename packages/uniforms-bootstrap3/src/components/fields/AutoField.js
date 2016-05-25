import {connectField}  from 'uniforms';
import {createElement} from 'react';

import NumField    from './NumField';
import BoolField   from './BoolField';
import DateField   from './DateField';
import ListField   from './ListField';
import NestField   from './NestField';
import TextField   from './TextField';
import SelectField from './SelectField';

const Auto = props => {
    let component = props.component;
    if (component === undefined) {
        if (props.allowedValues) {
            component = SelectField;
        } else {
            switch (props.type) {
                case Date:    component = DateField; break;
                case Array:   component = ListField; break;
                case Number:  component = NumField;  break;
                case Object:  component = NestField; break;
                case String:  component = TextField; break;
                case Boolean: component = BoolField; break;

                default: throw new Error(`Unsupported field type: ${props.type.toString()}`);
            }
        }
    }

    return createElement(component, props);
};

export default connectField(Auto, {includeInChain: false});
