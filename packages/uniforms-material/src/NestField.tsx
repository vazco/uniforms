import FormLabel from '@material-ui/core/FormLabel';
import React, { HTMLProps } from 'react';
import { Override, connectField } from 'uniforms';

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
    children ||
      fields?.map(field => (
        <AutoField key={field} name={field} {...itemProps} />
      )),
  );
}

export default connectField(Nest);
