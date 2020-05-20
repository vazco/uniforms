import React, { HTMLProps } from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

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
      {children ||
        fields?.map(field => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField(Nest);
