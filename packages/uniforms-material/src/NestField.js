import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import connectField from 'uniforms/connectField';
import injectName from 'uniforms/injectName';
import joinName from 'uniforms/joinName';

import AutoField from './AutoField';
import wrapField from './wrapField';

const Nest = ({children, fields, itemProps, label, name, ...props}) =>
  wrapField(
    {...props, component: undefined},
    label && <FormLabel component="legend">{label}</FormLabel>,
    children
      ? injectName(name, children)
      : fields.map(key => <AutoField key={key} name={joinName(name, key)} {...itemProps} />)
  );

Nest.defaultProps = {
  fullWidth: true,
  margin: 'none'
};

export default connectField(Nest, {ensureValue: false, includeInChain: false});
