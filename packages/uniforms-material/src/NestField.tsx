import FormLabel from '@material-ui/core/FormLabel';
import React, { HTMLProps } from 'react';
import { connectField, injectName, joinName, Override } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

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
  return wrapField(
    { ...props, component: undefined },
    label && <FormLabel component="legend">{label}</FormLabel>,
    children
      ? injectName(name, children)
      : fields?.map(key => (
          <AutoField key={key} name={joinName(name, key)} {...itemProps} />
        )),
  );
}

export default connectField(Nest, { includeInChain: false });
