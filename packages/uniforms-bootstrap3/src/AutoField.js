import BaseField from 'uniforms/BaseField';
import invariant from 'invariant';
import {createElement} from 'react';

import NumField from './NumField';
import BoolField from './BoolField';
import DateField from './DateField';
import ListField from './ListField';
import NestField from './NestField';
import TextField from './TextField';
import RadioField from './RadioField';
import SelectField from './SelectField';

export default class AutoField extends BaseField {
  static displayName = 'AutoField';

  getChildContextName() {
    return this.context.uniforms.name;
  }

  render() {
    const props = this.getFieldProps(undefined, {ensureValue: false});

    if (props.component === undefined) {
      if (props.allowedValues) {
        if (props.checkboxes && props.fieldType !== Array) {
          props.component = RadioField;
        } else {
          props.component = SelectField;
        }
      } else {
        switch (props.fieldType) {
          case Date:
            props.component = DateField;
            break;
          case Array:
            props.component = ListField;
            break;
          case Number:
            props.component = NumField;
            break;
          case Object:
            props.component = NestField;
            break;
          case String:
            props.component = TextField;
            break;
          case Boolean:
            props.component = BoolField;
            break;
        }

        invariant(props.component, 'Unsupported field type: %s', props.fieldType.toString());
      }
    }

    return createElement(props.component, this.props);
  }
}
