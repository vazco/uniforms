import React, { HTMLProps } from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: any; errorMessage?: string }
>;

function Error({ children, error, errorMessage, ...props }: ErrorFieldProps) {
  return !error ? null : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
}

export default connectField(Error, { initialValue: false, kind: 'leaf' });
