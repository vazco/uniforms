import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { connectField, injectName, joinName } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

const Nest = ({ children, fields, itemProps, label, name, ...props }) =>
  wrapField(
    { ...props, component: undefined },
    label && <FormLabel component="legend">{label}</FormLabel>,
    children
      ? injectName(name, children)
      : fields.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        )),
  );

Nest.defaultProps = {
  fullWidth: true,
  margin: 'dense',
};

export default connectField(Nest, {
  ensureValue: false,
  includeInChain: false,
});
