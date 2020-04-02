import React, { HTMLProps, ReactNode } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

export type ErrorFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    children?: ReactNode;
    error?: any;
    errorMessage?: string;
  }
>;

function Error({ children, error, errorMessage, ...props }: ErrorFieldProps) {
  return !error ? null : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
}

export default connectField(Error, { initialValue: false });
