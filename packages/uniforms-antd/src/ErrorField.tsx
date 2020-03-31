import React, { HTMLProps } from 'react';
import { connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = {
  error?: any;
  errorMessage?: string;
} & HTMLProps<HTMLDivElement>;

const Error = ({ children, error, errorMessage, ...props }: ErrorFieldProps) =>
  !error ? null : (
    <div {...filterDOMProps(props)}>
      {children ? (
        children
      ) : (
        <div style={{ margin: '3px' }}>{errorMessage}</div>
      )}
    </div>
  );

Error.defaultProps = {
  style: {
    backgroundColor: 'rgba(255, 85, 0, 0.2)',
    border: '1px solid rgb(255, 85, 0)',
    borderRadius: '7px',
    margin: '20px 0px',
    padding: '10px',
  },
};

export default connectField(Error, { initialValue: false });
