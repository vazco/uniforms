import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, injectName, joinName } from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = {
  error?: boolean;
  errorMessage?: string;
  name: string;
  fields?: any[];
  itemProps?: object;
  showInlineError?: boolean;
  grouped?: boolean;
} & HTMLProps<HTMLDivElement>;

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
}: NestFieldProps) => (
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

Nest.defaultProps = { grouped: true };

export default connectField<NestFieldProps>(Nest, { includeInChain: false });
