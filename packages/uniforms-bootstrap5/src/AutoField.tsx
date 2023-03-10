import invariant from 'invariant';
export { AutoFieldProps } from 'uniforms';
import { createAutoField } from 'uniforms';

import BoolField from './BoolField';
import DateField from './DateField';
import ListField from './ListField';
import NestField from './NestField';
import NumField from './NumField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';

const AutoField = createAutoField(props => {
  if (props.component) {
    return props.component;
  }

  if (props.options) {
    return props.checkboxes && props.fieldType !== Array
      ? RadioField
      : SelectField;
  }

  switch (props.fieldType) {
    case Array:
      return ListField;
    case Boolean:
      return BoolField;
    case Date:
      return DateField;
    case Number:
      return NumField;
    case Object:
      return NestField;
    case String:
      return TextField;
  }

  return invariant(false, 'Unsupported field type: %s', props.fieldType);
});

export default AutoField;
