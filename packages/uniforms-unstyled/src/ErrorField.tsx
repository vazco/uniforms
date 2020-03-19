import React, { HTMLProps, ReactNode } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

type ErrorFieldProps = {
  children?: ReactNode;
  error?: any;
  errorMessage?: string;
} & HTMLProps<HTMLDivElement>;

function Error({ children, error, errorMessage, ...props }: ErrorFieldProps) {
  return !error ? null : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
}

export default connectField(Error, { initialValue: false });
