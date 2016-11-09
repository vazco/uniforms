import invariant       from 'invariant';
import {connectField}  from 'uniforms';
import {createElement} from 'react';

import NumField    from './NumField';
import BoolField   from './BoolField';
import DateField   from './DateField';
import ListField   from './ListField';
import NestField   from './NestField';
import TextField   from './TextField';
import RadioField  from './RadioField';
import SelectField from './SelectField';

const Auto = ({component, ...props}) => {
    if (component === undefined) {
        if (props.allowedValues) {
            if (props.checkboxes && props.fieldType !== Array) {
                component = RadioField;
            } else {
                component = SelectField;
            }
        } else {
            switch (props.fieldType) {
                case Date:    component = DateField; break;
                case Array:   component = ListField; break;
                case Number:  component = NumField;  break;
                case Object:  component = NestField; break;
                case String:  component = TextField; break;
                case Boolean: component = BoolField; break;
            }

            invariant(component, 'Unsupported field type: %s', props.fieldType.toString());
        }
    }

    return createElement(component, props);
};

export default connectField(Auto, {ensureValue: false, includeInChain: false, initialValue: false});
