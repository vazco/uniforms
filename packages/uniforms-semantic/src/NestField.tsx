import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, injectName, joinName } from 'uniforms';

import AutoField from './AutoField';

const Nest = ({
  children,
  className,
  disabled,
  error,
  errorMessage,
  fields,
  grouped,
  itemProps,
  label,
  name,
  showInlineError,
  ...props
}) => (
  <div
    className={classnames(className, { disabled, error, grouped }, 'fields')}
    {...filterDOMProps(props)}
  >
    {label && (
      <div className="field">
        <label>{label}</label>
      </div>
    )}

    {!!(error && showInlineError) && (
      <div className="ui red basic label">{errorMessage}</div>
    )}

    {children
      ? injectName(name, children)
      : fields.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        ))}
  </div>
);

Nest.defaultProps = { grouped: true };

export default connectField(Nest, {
  ensureValue: false,
  includeInChain: false,
});
