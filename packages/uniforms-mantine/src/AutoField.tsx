import invariant from 'invariant';
import { createAutoField } from 'uniforms';
export { AutoFieldProps } from 'uniforms';

import BoolField from './BoolField';
import ListField from './ListField';
import NestField from './NestField';
import NumField from './NumField';
import SelectField from './SelectField';
import TextField from './TextField';

const AutoField = createAutoField(props => {
  if (props.allowedValues) {
    return SelectField;
  }

  switch (props.fieldType) {
    case Array:
      return ListField;
    case Boolean:
      return BoolField;
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
