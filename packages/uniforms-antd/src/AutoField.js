import invariant        from 'invariant';
import connectField     from 'uniforms/connectField';
import {createElement}  from 'react';

import BoolField        from './BoolField';
import DateField        from './DateField';
import HiddenField      from './HiddenField';
import ListField        from './ListField';
import NestField        from './NestField';
import NumField         from './NumField';
import RadioField       from './RadioField';
import SelectField      from './SelectField';
import TextField        from './TextField';

const Auto = ({component, ...props}) => {
    if (component === undefined) {
        if (props.fieldComponent) {
            if (props.fieldType === Array) {
                component = ListField;
            } else {
                switch (props.fieldComponent) {
                    case 'hidden'   :   component = HiddenField; break;
                }
                invariant(component, 'Unsupported field component: %s', props.fieldComponent);
            }
        } else if (props.allowedValues) {
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
