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
    fields?: any[];
    itemProps?: object;
    name: string;
  }
>;

function Nest({
  children,
  fields,
  itemProps,
  label,
  name,
  ...props
}: NestFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label>{label}</label>}

      {children
        ? injectName(name, children)
        : fields?.map(key => (
            <AutoField key={key} name={joinName(name, key)} {...itemProps} />
          ))}
    </div>
  );
}

export default connectField(Nest, { includeInChain: false });
