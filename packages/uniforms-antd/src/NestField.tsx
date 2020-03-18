import React from 'react';
import { connectField, filterDOMProps, injectName, joinName } from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
  children,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  ...props
}) => (
  <div {...filterDOMProps(props)}>
    {label && <label>{label}</label>}

    {!!(error && showInlineError) && <div>{errorMessage}</div>}

    {children
      ? injectName(name, children)
      : fields.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        ))}
  </div>
);

export default connectField(Nest, { includeInChain: false });
