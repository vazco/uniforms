import classnames from 'classnames';
import React from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { grouped?: boolean; itemProps?: object }
>;

function Nest({
  children,
  className,
  disabled,
  error,
  errorMessage,
  fields,
  grouped,
  itemProps,
  label,
  showInlineError,
  ...props
}: NestFieldProps) {
  return (
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

      {children ||
        fields?.map(field => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

Nest.defaultProps = { grouped: true };

export default connectField(Nest);
