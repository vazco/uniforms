import classnames from 'classnames';
import React from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { itemProps?: object }
>;

function Nest({
  children,
  className,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  showInlineError,
  ...props
}: NestFieldProps) {
  return (
    <div
      className={classnames(className, { 'has-error': error })}
      {...filterDOMProps(props)}
    >
      {label && <label>{label}</label>}

      {!!(error && showInlineError) && (
        <span className="text-danger">{errorMessage}</span>
      )}

      {children ||
        fields.map(field => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField<NestFieldProps>(Nest);
