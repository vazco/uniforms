import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import {
  connectField,
  filterDOMProps,
  injectName,
  joinName,
  Override,
} from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = Override<
  HTMLProps<HTMLDivElement>,
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

      {children
        ? injectName(name, children)
        : fields?.map(key => (
            <AutoField key={key} name={joinName(name, key)} {...itemProps} />
          ))}
    </div>
  );
}

Nest.defaultProps = { grouped: true };

export default connectField<NestFieldProps>(Nest, { includeInChain: false });
