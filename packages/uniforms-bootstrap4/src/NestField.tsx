import classnames from 'classnames';
import React from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

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
  name,
  showInlineError,
  ...props
}: NestFieldProps) {
  return (
    <div
      className={classnames(className, { 'has-error': error })}
      {...wrapField.__filterProps(filterDOMProps(props))}
    >
      {label && <label>{label}</label>}

      {!!(error && showInlineError) && (
        <span className="text-danger">{errorMessage}</span>
      )}

      {children ||
        fields?.map(field => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField(Nest);
