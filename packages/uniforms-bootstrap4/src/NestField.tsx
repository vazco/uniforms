import React, { HTMLProps } from 'react';
import classnames from 'classnames';
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
    itemProps?: object;
    name: string;
    showInlineError?: boolean;
  }
>;

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
}: NestFieldProps) => (
  <div
    className={classnames(className, { 'has-error': error })}
    {...filterDOMProps(props)}
  >
    {label && <label>{label}</label>}

    {!!(error && showInlineError) && (
      <span className="text-danger">{errorMessage}</span>
    )}

    {children
      ? injectName(name, children)
      : fields?.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        ))}
  </div>
);

export default connectField<NestFieldProps>(Nest, { includeInChain: false });
