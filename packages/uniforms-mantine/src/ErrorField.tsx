import React, { HTMLProps } from 'react';
import { Override, connectField, filterDOMProps } from 'uniforms';

type ErrorType = {
  message: string;
  code: number;
};

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: ErrorType; errorMessage?: string }
>;

function Error({ children, error, errorMessage, ...props }: ErrorFieldProps) {
  return !error ? null : (
    <div {...filterDOMProps(props)}>{children || errorMessage}</div>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: 'leaf',
});
