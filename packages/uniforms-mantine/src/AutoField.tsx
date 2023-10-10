import invariant from 'invariant';
import { createAutoField } from 'uniforms';
export { AutoFieldProps } from 'uniforms';

import BoolField from '/client/components/uniforms/base/BoolField';
import ListField from '/client/components/uniforms/base/ListField';
import NestField from '/client/components/uniforms/base/NestField';
import NumField from '/client/components/uniforms/base/NumField';
import SelectField from '/client/components/uniforms/base/SelectField';
import TextField from '/client/components/uniforms/base/TextField';

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
