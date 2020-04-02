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
    itemProps?: object;
    name: string;
    fields?: any[];
  }
>;

const Nest = ({
  children,
  itemProps,
  fields,
  label,
  name,
  ...props
}: NestFieldProps) => (
  <div {...filterDOMProps(props)}>
    {label && <label>{label}</label>}

    {children
      ? injectName(name, children)
      : fields?.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        ))}
  </div>
);

export default connectField<NestFieldProps>(Nest, { includeInChain: false });
