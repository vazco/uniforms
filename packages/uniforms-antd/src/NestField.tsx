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
    itemProps?: object;
    name: string;
    showInlineError?: boolean;
  }
>;

function Nest({
  children,
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
    <div {...filterDOMProps(props)}>
      {label && <label>{label}</label>}

      {!!(error && showInlineError) && <div>{errorMessage}</div>}

      {children
        ? injectName(name, children)
        : fields?.map(key => (
            <AutoField key={key} name={joinName(name, key)} {...itemProps} />
          ))}
    </div>
  );
}

export default connectField(Nest, { includeInChain: false });
