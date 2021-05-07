import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

// FIXME: wrapField is not typed correctly.
export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { helperText?: string; itemProps?: object; fullWidth?: boolean; margin?: any }
>;

function Nest({
  children,
  fields,
  fullWidth = true,
  itemProps,
  label,
  margin = 'dense',
  ...props
}: NestFieldProps) {
  return wrapField(
    { ...props, component: undefined, fullWidth, margin },
    label && <FormLabel component="legend">{label}</FormLabel>,
    children ||
      fields.map(field => (
        <AutoField key={field} name={field} {...itemProps} />
      )),
  );
}

export default connectField<NestFieldProps>(Nest);
