import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, injectName, joinName } from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
  children,
  className,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  ...props
}) => (
  <div
    className={classnames(className, { 'has-error': error })}
    {...filterDOMProps(props)}
  >
    {label && <label>{label}</label>}

    {!!(error && showInlineError) && (
      <span className="help-block">{errorMessage}</span>
    )}

    {children
      ? injectName(name, children)
      : fields.map((key: any) => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        ))}
  </div>
);

export default connectField(Nest, {
  ensureValue: false,
  includeInChain: false,
});
