import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { Override, connectField, filterDOMProps } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  {
    error?: boolean;
    errorMessage?: string;
    fields?: any[];
    grouped?: boolean;
    itemProps?: object;
    name: string;
    showInlineError?: boolean;
  }
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
  name,
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
